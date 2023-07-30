import React from "react";
import ExpenseCard from "./ExpenseCard";

const Expenses = ({ transactions }) => {
  const ExpenseList = transactions.map((transaction, index) => {
    return (
      <ExpenseCard
        key={index}
        description={transaction.description}
        createdAt={transaction.createdAt}
        price={transaction.price}
      />
    );
  });
  return <div className="mb-14">{ExpenseList}</div>;
};

export default Expenses;
