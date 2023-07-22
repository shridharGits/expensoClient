import { useState, useReducer } from "react";
import Header from "./Header";

const SignIn = () => {
  return (
    <div className="overflow-x  -hidden">
      <Header />
      <form className="p-4">
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="text"
          placeholder="Email"
          required
        />
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="password"
          placeholder="Password"
          required
        />
        <input
          type="submit"
          value="SIGN IN"
          className="font-bold text-white mt-5 h-12 rounded-lg border-solid border-2 w-full bg-indigo-400"
        />
      </form>
    </div>
  );
};

export default SignIn;
