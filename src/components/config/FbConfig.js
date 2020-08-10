import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD5B3B_xSFF-fzJTbhjk-gTzu27olB-PCM",
    authDomain: "polynotes-c42cd.firebaseapp.com",
    databaseURL: "https://polynotes-c42cd.firebaseio.com",
    projectId: "polynotes-c42cd",
    storageBucket: "polynotes-c42cd.appspot.com",
    messagingSenderId: "686626006324",
    appId: "1:686626006324:web:60d6fde1210c30c705f161"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
