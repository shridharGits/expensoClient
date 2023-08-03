import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ExpenseCard = ({ description, createdAt, date, price }) => {
  const day = new Date(createdAt).toString().split(" ");
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
      </div>
    </div>
  );
};

export default ExpenseCard;
