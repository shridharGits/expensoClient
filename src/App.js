import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  return <div className="">Here we go again!</div>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
