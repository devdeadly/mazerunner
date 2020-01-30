import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUXJoPE8racAbpXI__rH5uMvOrp5ILeSc",
  authDomain: "snake-5348f.firebaseapp.com",
  databaseURL: "https://snake-5348f.firebaseio.com",
  projectId: "snake-5348f",
  storageBucket: "snake-5348f.appspot.com",
  messagingSenderId: "690000700407",
  appId: "1:690000700407:web:9e8c66f72262a6f08644f2",
  measurementId: "G-8DK8DEX10Y"
};

firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;

export const loginWithGoogle = async () => {
  try {
    const result = await firebase.auth().signInWithPopup(googleProvider);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

document.getElementById('google-login').addEventListener('click', () => {
	loginWithGoogle();
})
