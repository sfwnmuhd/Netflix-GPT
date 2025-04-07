import React, { useState } from 'react'
import Header from './Header'


const Login = () => {
  const [isSignInForm, setIsSignInForm]= useState(true);

  const toggelSignInForm = ()=>{
    setIsSignInForm(!isSignInForm)

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
      <form className="bg-[rgba(0,0,0,0.7)] text-white absolute my-36 w-3/12 mx-auto right-0 left-0 flex flex-col p-8 rounded-lg">
        <h1 className="text-3xl font-bold py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 outline-none rounded w-full bg-gray-700"
        />
        )}
        <input
          type="text"
          placeholder="Email or phone number"
          className="p-4 my-4 outline-none rounded w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 outline-none rounded w-full bg-gray-700"
        />
        <button className="w-full p-4 my-6 cursor-pointer bg-red-700 rounded hover:bg-red-800">
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