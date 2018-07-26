import firebase from 'firebase';
require('firebase/firestore/dist/index.cjs');

var config = {
  apiKey: 'AIzaSyAjGTOHeeIKLa0_dSjTNQh3cxFVgOSw__8',
  authDomain: 'notforrealsies-f5b75.firebaseapp.com',
  databaseURL: 'https://notforrealsies-f5b75.firebaseio.com',
  projectId: 'notforrealsies-f5b75',
  storageBucket: 'notforrealsies-f5b75.appspot.com',
  messagingSenderId: '521873201284'
};

firebase.initializeApp(config);

export let db = firebase.firestore();

firebase
  .firestore()
  .enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
    db = firebase.firestore();
  })
  .catch(err => {
    console.log(err.code);
    return firebase.firestore();
  });

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
