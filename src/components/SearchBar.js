import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { input: '' };
    }
    
    // on input, change state of input and parse input
    onInputChange(input) {
        this.setState({ input });
        this.props.onSearchTermChange(input);
    }

    render() {
        return (
            <div className="search-bar" style={{margin: "20px", textAlign: "center"}}>
                <input
                    value={this.state.input}
                    onChange={event => this.onInputChange(event.target.value)}
                    style = {{ width: "75%" }}
                />
            </div>
        );
    }
}

export default SearchBar;
