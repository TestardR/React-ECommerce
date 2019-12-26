import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDE_wRi41MW1ne-9gQclahwHilbRuw5hiw",
  authDomain: "crown-db-2c8a5.firebaseapp.com",
  databaseURL: "https://crown-db-2c8a5.firebaseio.com",
  projectId: "crown-db-2c8a5",
  storageBucket: "crown-db-2c8a5.appspot.com",
  messagingSenderId: "350589156527",
  appId: "1:350589156527:web:137788297215542be7285a"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
