import React, { useState } from "react";
import AddExpense from "./AddExpense";
const ExpenseCard = ({ description, createdAt, date, price }) => {
  const day = new Date(createdAt).toString().split(" ");
  const commonCss = "m-1 p-1 rounded-lg";
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex bg-gray-200 rounded-lg p-2 m-2">
      <div className="w-full">
        <p className="h-1/2 text-base">{description}</p>
        <div className="flex flex-col">
          <p className="text-xs">{`${day[1]} ${day[2]} ${day[3]}`}</p>
          <p className="text-xs"> Bal: ₹ 1212121</p>
        </div>
      </div>
      <div className="w-1/3 font-bold">
        <p className="items-center">₹ {price}</p>
        <button className="text-sm bg-gray-300 pl-2 pr-2" onClick={handleOpen}>
          EDIT
        </button>
      </div>
      <AddExpense isOpen={isOpen} />
    </div>
  );
};

export default ExpenseCard;
