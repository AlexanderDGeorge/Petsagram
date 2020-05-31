import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQggriTOGo2d7Kqh4AnrrLIwjWiuQi8OI",
  authDomain: "pet-feeds.firebaseapp.com",
  databaseURL: "https://pet-feeds.firebaseio.com",
  projectId: "pet-feeds",
  storageBucket: "pet-feeds.appspot.com",
  messagingSenderId: "257211157297",
  appId: "1:257211157297:web:2fc9c0f27e138989bfbe10",
  measurementId: "G-BMMEWNNK1S",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

export const signOut = () => auth.signOut();
