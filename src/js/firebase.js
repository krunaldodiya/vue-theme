import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD4UV2iLxdQ7Da-6Q1uwn5LEnW7za1CATs",
  authDomain: "awesometheme-7d24e.firebaseapp.com",
  databaseURL: "https://awesometheme-7d24e.firebaseio.com",
  projectId: "awesometheme-7d24e",
  storageBucket: "awesometheme-7d24e.appspot.com",
  messagingSenderId: "369140059237"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export { db, auth };
