import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALWdiPzxfwAmk_gG-sZR60e5jcyWuOCiI",
  authDomain: "petsagram-4e23d.firebaseapp.com",
  databaseURL: "https://petsagram-4e23d.firebaseio.com",
  projectId: "petsagram-4e23d",
  storageBucket: "petsagram-4e23d.appspot.com",
  messagingSenderId: "598311129752",
  appId: "1:598311129752:web:a67f125fcb8195847236ed",
  measurementId: "G-0JGXB599KX",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

export const signOut = () => auth.signOut();
