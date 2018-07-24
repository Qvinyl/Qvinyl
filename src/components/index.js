import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Qvinyl from './Qvinyl'
import { firebaseAuth } from '../config/constants'

// login redirect authentication
function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
        {...rest}
        render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
            />
    )
}

// default home page
function PublicRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
        {...rest}
        render={(props) => authed === false
            ? <Component {...props} />
            : <Redirect to='/Qvinyl' />}
            />
        )
}

export default class App extends Component {
    state = {
        authed: false,
        loading: true,
    }
    // grab auth for loading screen
    componentDidMount () {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false,
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }

    componentWillUnmount () {
        this.removeListener()
    }
    
    render() {
        return this.state.loading === true ? <h1>Loading</h1> : (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                    <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                    <PrivateRoute authed={this.state.authed} path='/Qvinyl' component={Qvinyl} />
                    <Route render={() => <h3>No Match</h3>} />
                </Switch>
            </BrowserRouter>
        );
    }
}
