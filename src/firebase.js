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
const fieldValue = firebase.firestore.FieldValue;

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const signInWithGoogle = async () => {
  return auth.signInWithPopup(googleProvider).then(({ user }) => {
    createUserDoc(user, { username: "", name: user.displayName });
  });
};
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
    let { email, photoURL } = user;
    const { username, name } = additionalData;
    const createdAt = new Date();
    try {
      await userRef.set({
        name,
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

export const updateUserDoc = async (uid, photoURL, name, username, bio) => {
  try {
    const userRef = firestore.collection("users").doc(uid);
    await userRef.update({
      photoURL,
      name,
      username,
      bio,
    });
  } catch (error) {
    console.error(error);
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
      user: user.uid,
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
          posts: fieldValue.arrayUnion(postRef.id),
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

export const getUserPost = async (postId) => {
  if (!postId) return;
  try {
    const userPost = await firestore.collection("user-posts").doc(postId).get();
    return { id: postId, ...userPost.data() };
  } catch (error) {
    console.error(error);
  }
};

export const getPostFeed = async (currentUser) => {
  if (!currentUser) return;
  try {
    const postsRef = await firestore
      .collection("user-posts")
      .where("user", "in", [currentUser.uid, ...currentUser.following])
      .orderBy("createdAt", "desc")
      .get();
    return postsRef.docs.map((post) => post.data());
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (post, user) => {
  if (!post || !user) return;
  try {
    const postRef = firestore.collection("user-posts").doc(post.id);
    const userRef = firestore.collection("users").doc(user.uid);
    userRef.update({
      posts: fieldValue.arrayRemove(post.id),
    });
    await postRef.delete();
  } catch (error) {
    console.error(error);
  }
};

export const getExactUser = async (params) => {
  if (!params) return;
  try {
    const usersRef = await firestore
      .collection("users")
      .where("username", "==", params)
      .get();
    const userDocs = [];
    usersRef.forEach((userRef) => {
      userDocs.push({ uid: userRef.id, ...userRef.data() });
    });
    return userDocs;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    const users = await firestore.collection("users").get();
    return users.docs.map((user) => user.data());
  } catch (error) {
    console.error(error);
  }
};

export const followUser = async (curUser, otherUser) => {
  if (!curUser || !otherUser) return;
  try {
    const curUserRef = firestore.collection("users").doc(curUser.uid);
    const otherUserRef = firestore.collection("users").doc(otherUser.uid);
    await curUserRef.update({
      following: fieldValue.arrayUnion(otherUser.uid),
    });
    await otherUserRef.update({
      followers: fieldValue.arrayUnion(curUser.uid),
    });
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUser = async (curUser, otherUser) => {
  if (!curUser || !otherUser) return;
  try {
    const curUserRef = firestore.collection("users").doc(curUser.uid);
    const otherUserRef = firestore.collection("users").doc(otherUser.uid);
    await curUserRef.update({
      following: fieldValue.arrayRemove(otherUser.uid),
    });
    await otherUserRef.update({
      followers: fieldValue.arrayRemove(curUser.uid),
    });
  } catch (error) {
    console.error(error);
  }
};

export const addComment = async (currentUser, post, comment) => {
  if (!currentUser || !post || !comment) return;
  try {
    const postRef = firestore.collection("user-posts").doc(post.id);
    await postRef.update({
      comments: fieldValue.arrayUnion({
        username: currentUser.username,
        content: comment,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeComment = async (currentUser, post, comment) => {
  if (!currentUser || !post || !comment) return;
  try {
    const postRef = firestore.collection("user-posts").doc(post.id);
    await postRef.update({
      comments: fieldValue.arrayRemove({
        username: currentUser.username,
        content: comment,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const addLike = async (currentUser, post) => {
  if (!currentUser || !post) return;
  try {
    const postRef = firestore.collection("user-posts").doc(post.id);
    await postRef.update({
      likes: fieldValue.arrayUnion(currentUser.username),
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeLike = async (currentUser, post) => {
  if (!currentUser || !post) return;
  try {
    const postRef = firestore.collection("user-posts").doc(post.id);
    await postRef.update({
      likes: fieldValue.arrayRemove(currentUser.username),
    });
  } catch (error) {
    console.error(error);
  }
};
