import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

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
export const storageRef = firebase.storage().ref();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

export const signOut = () => {
  document.title = "Pet Feed";
  auth.signOut();
};

export const createUserDoc = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    let { displayName, email, photoURL } = user;
    const { username, name } = additionalData;
    const createdAt = new Date();
    displayName = displayName ? displayName : name;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        username,
        followers: [],
        following: [],
        posts: [],
        bio: "",
      });
    } catch (error) {
      console.error("Error creating user", console.error);
    }
  }

  return getUserDoc(user.uid);
};

export const getUserDoc = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection("users").doc(uid).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const uploadImage = async (file, user, caption, setUser) => {
  if (!file) return;
  return storageRef
    .child(`images/${file.name}`)
    .put(file)
    .then(async (snapshot) => {
      await snapshot.ref.getDownloadURL().then(async function (downloadURL) {
        await addPost(downloadURL, user, caption);
        const userDoc = await getUserDoc(user.uid);
        setUser(userDoc);
        return userDoc;
      });
    });
};

const addPost = async (url, user, caption) => {
  const createdAt = new Date();
  const userRef = firestore.collection("users").doc(user.uid);
  await firestore
    .collection("user-posts")
    .add({
      url,
      caption,
      comments: [],
      likes: [],
      reactions: [],
      createdAt,
    })
    .then(async function (postRef) {
      await userRef
        .update({
          posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
        })
        .then(function () {
          console.log("Document updated");
        })
        .catch(function (error) {
          console.error(error);
        });
    })
    .catch(function (error) {
      console.error(error);
    });
};
