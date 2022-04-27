import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  firestore,
  doc,
  getDoc,
  setDoc,
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDHUvha2PIq_Hh_OLbuyhaPTRCo9sQbFdA",
  authDomain: "crwn-db-1c7a8.firebaseapp.com",
  projectId: "crwn-db-1c7a8",
  storageBucket: "crwn-db-1c7a8.appspot.com",
  messagingSenderId: "718241144742",
  appId: "1:718241144742:web:325b2e7f70a291bd29f967",
  measurementId: "G-Y9D0GLP4Y4"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  console.log(userAuth)
  const userDocRef =  doc(db, 'user', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot  = await getDoc(userDocRef)
  console.log(userSnapshot)

  const {displayName, email} = userAuth
  const createdAt = new Date()
  //if the user is not registered in firebase, we will create the user else return the user information
  if(!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log(error)
    }
  }

  return userDocRef

}
