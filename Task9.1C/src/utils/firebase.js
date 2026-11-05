// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUcBK_rpYnFEdjfOb931OY6a4ZPr1GoR0",
  authDomain: "deakinwebapp-5899c.firebaseapp.com",
  projectId: "deakinwebapp-5899c",
  storageBucket: "deakinwebapp-5899c.firebasestorage.app",
  messagingSenderId: "461754791912",
  appId: "1:461754791912:web:fa53af5661117d87f3d65d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt:"select_account",
    });
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth, additionalinfo) => {
    if(!userAuth.email) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())
    if(!userSnapshot.exists())
    {
        const{displayName, email}= userAuth;
        const createdAT = new Date();
    

    try{
        await setDoc(userDocRef, { displayName, email, createdAT, ...additionalinfo})
    }
    catch(error){
        console.log("error creating account", error.message)
    }
}
return userDocRef
}
export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth, email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email|| !password) return;
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);