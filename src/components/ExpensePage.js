import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HOST_URL } from "./Constants";
import Header2 from "./Header2";
import AddExpense from "./AddExpense";

const ExpensePage = () => {
  const params = useParams();
  const { id } = params;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleAddExpenseOpenClose = () => {
    setIsOpen(!isOpen);
  };
  const getExpenseData = async () => {
    try {
      const response = await fetch(`${HOST_URL}/expenses/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log(data.invoice);
        setExpense(data.invoice);
      } else {
        throw new Error('Failed to fetch expense data');
      }
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
      // Handle error here
    }
    
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${HOST_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        throw new Error('Failed to delete expense');
      }
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
      // Handle error here
    }
    
  };
  const [expense, setExpense] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getExpenseData();
  }, []);
  let d = new Date(expense.date ?? expense.createdAt);
  console.log(d);
  return (
    <div className="display flex flex-col min-h-screen bg-slate-900">
      <Header2 />
      <div className="bg-white rounded-t-3xl h-screen">
        <div className="text-black">
          <p className="text-2xl text-center">{expense.description}</p>
          <p>{expense.price}</p>
          <div>
            {expense.ruleTags?.needs && <p>NEEDS: {expense.ruleTags.needs}</p>}
            {expense.ruleTags?.wants && <p>WANTS: {expense.ruleTags.wants}</p>}
          </div>
          <p>{expense.date}</p>
        </div>
        <div className="relative flex justify-between">
          <button
            className="bg-blue-300 p-2 rounded-lg w-24"
            onClick={handleDelete}>
            DELETE
          </button>
          <AddExpense
            isOpen={isOpen}
            handleAddExpenseOpenClose={handleAddExpenseOpenClose}
            editData={expense}
          />
          <button
            className="bg-yellow-300 p-2 rounded-lg w-24"
            onClick={handleAddExpenseOpenClose}>
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
