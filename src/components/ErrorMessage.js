import React from "react";

const ErrorMessage = ({ message, color }) => {
  console.log(`class : ${color} text-center`);
  return (
    <div>
      <p className={`${color} text-center font-medium`}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
