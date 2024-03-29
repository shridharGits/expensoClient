import { useState, useReducer } from "react";
import Header from "./Header";
import axios from 'axios';
import { HOST_URL } from "./Constants";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.field]: action.value };
  }
};

const SignIn = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [signUpFailedMessage, setSignUpFailedMessage] = useState({
    message: "",
    color: "",
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE", field, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${HOST_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something Went Wrong!');
        }
        return response.json();
      })
      .then((data) => {
        if (!data.token) {
          setSignUpFailedMessage((prevState) => ({
            ...prevState,
            message: 'Something Went Wrong!',
            color: 'text-red-500',
          }));
        } else {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.log('login failed');
        setSignUpFailedMessage((prevState) => ({
          ...prevState,
          message: error.message,
          color: 'text-red-500',
        }));
        console.log(signUpFailedMessage);
      });    
  };

  const handleForgotPassword = () => {
    setSignUpFailedMessage((prevState) => {
      return {
        ...prevState,
        message: "Sitback, Relax and Remember",
        color: "text-emerald-400",
      };
    });
  };

  return (
    <div className="overflow-x-hidden">
      <Header />

      {signUpFailedMessage?.message?.length > 0 && (
        <ErrorMessage
          message={signUpFailedMessage.message}
          color={signUpFailedMessage.color}
        />
      )}
      <form className="p-4" onSubmit={handleSubmit}>
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="text"
          placeholder="Email"
          required
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button
          name="forgotPassword"
          type="button"
          className="mt-2 text-sm text-pink-700"
          onClick={handleForgotPassword}>
          Forgot Password?
        </button>
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
