import React from "react";
import ExpenseCard from "./ExpenseCard";
import { Link } from "react-router-dom";

const Expenses = ({ transactions }) => {
  const ExpenseList = transactions.map((transaction, index) => {
    return (
      <Link to={`/expenses/${transaction._id}`} className="cursor-pointer">
        <ExpenseCard
          key={index}
          description={transaction.description}
          createdAt={transaction.createdAt}
          price={transaction.price}
        />
      </Link>
    );
  });
  return <div className="mb-14">{ExpenseList}</div>;
};

export default Expenses;
