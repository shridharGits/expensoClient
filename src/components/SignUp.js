import { useState, useReducer } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { HOST_URL } from "./Constants";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  monthlyIncome: 0,
  phone: 0,
  needs: 50,
  wants: 30,
  saving: 20,
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.field]: action.value };
  }
  return state;
};
const SignUp = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [signUpFailedMessage, setSignUpFailedMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE", field, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Number(state.needs) + Number(state.wants) + Number(state.saving) !=
      100
    ) {
      setSignUpFailedMessage(
        "Total Sum of Wants, Needs and Saving Should be 100"
      );
    } else {
      axios
        .post(`${HOST_URL}/users/signup`, JSON.stringify(state), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data.user);
          navigate("/signin");
        })
        .catch((e) => {
          console.log(e);
          setSignUpFailedMessage(e.response.data.msg);
        });
    }
  };
  return (
    <div className="overflow-x-hidden">
      <Header />
      {signUpFailedMessage?.length > 0 && (
        <ErrorMessage message={signUpFailedMessage} />
      )}
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between">
          <input
            className="h-10 w-40 border-solid border-2 border-indigo-400 rounded-lg p-2"
            type="text"
            placeholder="Firstname"
            required
            name="firstname"
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
          <input
            className="h-10 w-40 border-solid border-2 border-indigo-400 rounded-lg p-2"
            type="text"
            placeholder="Lastname"
            required
            name="lastname"
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
        </div>
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="text"
          placeholder="Email"
          required
          name="email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="number"
          placeholder="Phone (Optional)"
          name="phone"
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <input
          className="h-10 w-full mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2"
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <div className="flex mt-5 justify-between">
          <p className="w-40 border-solid border-2 border-emerald-300 rounded-lg p-2">
            Add Montly Income
          </p>
          <input
            className="h-10 w-1/2 border-solid border-2 border-indigo-400 rounded-lg p-2"
            type="number"
            placeholder="Eg. 58000"
            required
            name="monthlyIncome"
            onChange={(e) => handleChange("monthlyIncome", e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-5">
          <div>
            <p className="w-40 h-full item-center border-solid border-2 border-emerald-300 text-center rounded-lg p-2">
              ADD YOUR FINANCE RULE (Default: 50% needs, 30% wants, 20% saving)
            </p>
          </div>
          <div className="w-1/2 flex flex-col">
            <input
              className="h-10  border-solid border-2 border-indigo-400 rounded-lg p-2"
              type="number"
              placeholder="50"
              required
              name="needs"
              onChange={(e) => handleChange("needs", e.target.value ?? 50)}
              value={state.needs}
            />
            <input
              className="h-10 mt-1 border-solid border-2 border-indigo-400 rounded-lg p-2"
              type="number"
              placeholder="30"
              required
              name="wants"
              onChange={(e) => handleChange("wants", e.target.value ?? 30)}
              value={state.wants}
            />
            <input
              className="h-10 mt-1 w-full border-solid border-2 border-indigo-400 rounded-lg p-2"
              type="number"
              placeholder="20"
              required
              name="saving"
              onChange={(e) => handleChange("saving", e.target.value ?? 20)}
              value={state.saving}
            />
          </div>
        </div>
        <input
          type="submit"
          value="SIGN UP"
          className="font-bold text-white mt-5 h-12 rounded-lg border-solid border-2 w-full bg-indigo-400"
        />
      </form>
    </div>
  );
};

export default SignUp;
