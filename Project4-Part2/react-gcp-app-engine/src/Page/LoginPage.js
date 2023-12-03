import React, { useState, useEffect } from 'react';
//import firebase from './firebase';
import { getAuth, signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../helper/firebaseConfig';
// This is the login page. 
  function LoginPage(){
    //initialize the states 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');

    const navigateTo = useNavigate();

    //use to login 
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider)
          .then((result) => {
              // User signed in
              console.log(result.user);
          }).catch((error) => {
            // Handle Errors here.
              console.error(error);
          });
      };
        
    function Login() {
      // Add any necessary login logic here
      return (

        <div className='loginPage'>
         <h1>Wheel Of Fortune</h1>
          <div id="image">
              <img id="homepagewheel" src="https://thetrainingarcade.com/wp-content/uploads/2020/11/WOF-EXTENDED-logo.png" alt="Wheel of Fortune" width="400" height="400"/>
          </div>
          <button onClick={signInWithGoogle}ype="button" className="btn btn-primary btn-lg">Sign in with Google</button>
          
        </div>
      );
    }
    //use to login
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            console.log("User is signed in:", user);
            setUserId(user.uid);
            setIsLoggedIn(true);
          } else {
            // No user is signed in.
            console.log("No user is signed in.");
          }
      });
    }, []);

    //if login is true, navigateTo the /game page
    useEffect(() => {
        if(isLoggedIn){
            navigateTo("/wheel");
        }
      }, [isLoggedIn]);

      if (!isLoggedIn) {
        // If the user is not logged in, show the login page
        return <Login onLogin={() => setIsLoggedIn(true)}/>;
      }
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;


        return(
            <div>
                {Login}
            </div>
        )
  }
  export default LoginPage;

