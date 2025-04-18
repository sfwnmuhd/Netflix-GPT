import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm]= useState(true);
  const[errorMessage, setErrorMessage]= useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggelSignInForm = ()=>{
    setIsSignInForm(!isSignInForm)

  }

  const handleBtnClick = ()=>{
    // Validate the form data
    const message = checkValidData(
      email.current?.value, 
      password.current?.value, 
      isSignInForm ? null : name.current?.value);
    setErrorMessage(message);
    
    if(message) return;
    // Sign In / Sign Up Logic
    if(!isSignInForm){
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://lh3.googleusercontent.com/a/ACg8ocI65oo7IzvgYulGR3TFidrIJg3HtjmrBXETWvYbF3psc3fbFdI6=s96-c"
        }).then(() => {
          // Profile updated!
          // ...
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          ;
          navigate("/browse")

        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        });
        
      
        
      })
      
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-" +errorMessage)
        
      });


    }
    else{
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-" +errorMessage);
      });

    }
      
    console.log(message);

    
  }
  return (
    

    <div className="relative min-h-screen ">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Form */}
      <form onSubmit={(e)=> e.preventDefault()} className="bg-[rgba(0,0,0,0.7)] text-white absolute my-36 lg:w-3/12 md:w-4/12 sm:w-4/12 mx-auto right-0 left-0 flex flex-col p-8 rounded-lg space-y-6">
        <h1 className="text-3xl font-bold py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
          ref={name}
          type="text"
          placeholder="Full Name"
          className="pw-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email or phone number"
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
        <button className="w-full py-3 cursor-pointer bg-red-700 rounded hover:bg-red-800" onClick={handleBtnClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-6 cursor-pointer  hover:underline " onClick={toggelSignInForm}>
          {isSignInForm? "New to Netflix? Sign Up Now" : "Already have an account? Sign In"} 
        </p>
      </form>
    </div>
  );
}

export default Login