import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Header2 from "./components/Header2";
import ExpensePage from "./components/ExpensePage";

const App = () => {
  return <div className="">Here we go again!</div>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // element: <Dashboard />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/expenses/:id",
    element: <ExpensePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
