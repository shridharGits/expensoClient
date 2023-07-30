import React from "react";
import { APP_NAME } from "./Constants";

const Header2 = () => {
  return (
    <div className="bg-slate-900 text-white p-5 font-bold flex flex-row justify-between items-center h-24 w-full">
      <h1 className="text-3xl">{APP_NAME}</h1>
      <button className="inline-block align-middle bg-teal-500 p-2 rounded-lg w-32 text-xs">
        UPDATE PROFILE
      </button>
    </div>
  );
};

export default Header2;
