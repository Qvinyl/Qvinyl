import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCPc36j9KKh0OHwNp6jxnZAImJmdoSmdN0",
    authDomain: "qvinyl-d19ec.firebaseapp.com",
    databaseURL: "https://qvinyl-d19ec.firebaseio.com",
    projectId: "qvinyl-d19ec",
    storageBucket: "qvinyl-d19ec.appspot.com",
    messagingSenderId: "218472401275"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth