import {useEffect} from 'react'

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInGoogleRedirect
} from '../../utils/firebase/firebase.utils';

import {getRedirectResult} from 'firebase/auth'



const SignIn = () => {


  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef)
  };

  useEffect(() => {
    const fn = async() => {
      const response = await getRedirectResult(auth)
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef)
      }
    }
    fn()

  }, [])
  

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInGoogleRedirect}>Sign in with Google Redirect</button>
    </div>
  );
};

export default SignIn;
