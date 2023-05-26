// import firebase from 'firebase/app';
// import 'firebase/messaging';

// const firebaseConfig = {
//     apiKey: "AIzaSyCnS38YzWWS0kVNGNm2X-2gBUhbRnpHLYQ",
//     authDomain: "trackbook-ffdf4.firebaseapp.com",
//     projectId: "trackbook-ffdf4",
//     storageBucket: "trackbook-ffdf4.appspot.com",
//     messagingSenderId: "107111408492",
//     appId: "1:107111408492:web:4962f80214cdf53f6b4949"
// };

// firebase.initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCnS38YzWWS0kVNGNm2X-2gBUhbRnpHLYQ",
    authDomain: "trackbook-ffdf4.firebaseapp.com",
    projectId: "trackbook-ffdf4",
    storageBucket: "trackbook-ffdf4.appspot.com",
    messagingSenderId: "107111408492",
    appId: "1:107111408492:web:4962f80214cdf53f6b4949"
};

export const app = initializeApp(firebaseConfig);

// ----------------------
export const messaging = getMessaging(app)

// ----------------------
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {

        const name = result.user.displayName
        const email = result.user.email
        const photo = result.user.photoURL

        localStorage.setItem("token", email)

    }).catch((error) => {
        console.log(error)
    })
}