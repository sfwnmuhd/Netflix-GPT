import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../utils/firebase';


const Login = () => {
  const [isSignInForm, setIsSignInForm]= useState(true);
  const[errorMessage, setErrorMessage]= useState(null);

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
        console.log(user)
        
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
    

    <div className="relative h-screen">
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
      <form onSubmit={(e)=> e.preventDefault()} className="bg-[rgba(0,0,0,0.7)] text-white absolute my-36 w-3/12 mx-auto right-0 left-0 flex flex-col p-8 rounded-lg">
        <h1 className="text-3xl font-bold py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
          ref={name}
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 outline-none rounded w-full bg-gray-700"
        />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email or phone number"
          className="p-4 my-4 outline-none rounded w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 outline-none rounded w-full bg-gray-700"
        />
        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
        <button className="w-full p-4 my-6 cursor-pointer bg-red-700 rounded hover:bg-red-800" onClick={handleBtnClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-6 cursor-pointer" onClick={toggelSignInForm}>
          {isSignInForm? "New to Netflix? Sign Up Now" : "Already have an account? Sign In"} 
        </p>
      </form>
    </div>
  );
}

export default Login