import firebase from "firebase/app";
import messaging from "firebase/messaging";

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

const messaging = firebase.messaging();
