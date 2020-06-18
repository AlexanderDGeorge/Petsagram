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
export const fieldValue = firebase.firestore.FieldValue;
export const authProvider = firebase.auth.EmailAuthProvider.credential;

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
    return auth.signInWithPopup(googleProvider).then(({ user }) => {
        createUserDoc(user, user.displayName, user.displayName);
    });
};

export const signOut = () => {
    document.title = "Petsagram";
    auth.signOut();
};

export const createUserDoc = async (user, username, fullname) => {
    if (!user) return;

    const createdAt = new Date();
    const { photoURL } = user;
    const userRef = firestore.collection("users").doc(user.uid);
    await userRef.set({
        username,
        fullname,
        photoURL: photoURL
            ? photoURL
            : "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/dog-face_1f436.png",
        createdAt,
        followers: [],
        following: [],
        messaging: [],
        posts: [],
        bio: "",
    });
    const newUser = await userRef.get();
    return { uid: user.uid, ...newUser.data() };
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

export const updateUserDoc = async (uid, photoURL, fullname, username, bio) => {
    try {
        const userRef = firestore.collection("users").doc(uid);
        await userRef.update({
            photoURL,
            fullname,
            username,
            bio,
        });
        const user = await userRef.get();
        return { uid, ...user.data() };
    } catch (error) {
        console.error(error);
    }
};

export const sendResetPassword = (email) => {
    auth.sendPasswordResetEmail(email);
};

export const updateUserPassword = async (newPassword) => {
    if (!newPassword) return;
    try {
        await auth.currentUser.updatePassword(newPassword);
        return true;
    } catch (error) {
        console.error(error);
    }
};

export const uploadPhotoURL = async (file, user) => {
    if (!file || !user) return;
    try {
        return await storageRef
            .child(`photoURLs/${user.uid}`)
            .put(file)
            .then((snapshot) => snapshot.ref.getDownloadURL());
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
            await snapshot.ref
                .getDownloadURL()
                .then(async function (downloadURL) {
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
        const userPost = await firestore
            .collection("user-posts")
            .doc(postId)
            .get();
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
        return postsRef.docs.map((post) => ({ id: post.id, ...post.data() }));
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

export const getExactUser = async (username) => {
    if (!username) return;
    try {
        const usersRef = await firestore
            .collection("users")
            .where("username", "==", username)
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
        return users.docs.map((user) => ({ uid: user.id, ...user.data() }));
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

export const addLike = async (currentUser, post) => {
    if (!currentUser || !post) return;
    try {
        const postRef = firestore.collection("user-posts").doc(post.id);
        await postRef.update({
            likes: fieldValue.arrayUnion(currentUser.uid),
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
            likes: fieldValue.arrayRemove(currentUser.uid),
        });
    } catch (error) {
        console.error(error);
    }
};

export const createMessageGroup = async (currentUser, user) => {
    if (!currentUser || !user) return;
    try {
        const curUserRef = firestore.collection("users").doc(currentUser.uid);
        const userRef = firestore.collection("users").doc(user.uid);
        const groupRef = await firestore.collection("user-messages").add({
            users: [currentUser.uid, user.uid],
            messages: [],
        });
        curUserRef.update({
            messages: fieldValue.arrayUnion(groupRef.id),
        });
        userRef.update({
            messages: fieldValue.arrayUnion(groupRef.id),
        });
        return { id: groupRef.id, ...groupRef.data() };
    } catch (error) {
        console.error(error);
    }
};
