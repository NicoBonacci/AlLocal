import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD16Em3cB5TbUdfE6JCFaeAnCcZfJ7EAM8",
    authDomain: "ordinal-mote-333411.firebaseapp.com",
    databaseURL: "https://ordinal-mote-333411.firebaseio.com",
    projectId: "ordinal-mote-333411",
    storageBucket: "ordinal-mote-333411.appspot.com",
    messagingSenderId: "730233490713",
    appId: "1:730233490713:ios:16f6fd6ea1ef0263ba4988",
};

app = firebase.initializeApp(firebaseConfig)

export { firebase };