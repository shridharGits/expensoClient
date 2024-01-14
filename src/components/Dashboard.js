import axios from 'axios';
import React, { useEffect, useState } from "react";
import { HOST_URL } from "./Constants";
import { useNavigate } from "react-router-dom";
import Header2 from "./Header2";
import Rulebox from "./Rulebox";
import Expenses from "./Expenses";
import AddExpense from "./AddExpense";

const Dashboard = () => {
  const navigate = useNavigate();
  const initialState = {
    needs: 0,
    wants: 0,
    savings: 0,
    dailyTransactions: [],
  };
  const [dashboardData, setDashboardData] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddExpenseOpenClose = () => {
    setIsOpen(!isOpen);
  };

  async function getData() {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get(`${HOST_URL}/dashboard`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res?.data?.dailyBudgetStats;
        console.log("dashboard successful");
        setDashboardData({
          needs: parseFloat(data.needsLeft).toFixed(2),
          wants: parseInt(data.wantsLeft).toFixed(2),
          savings: parseInt(data.savingsDone).toFixed(2),
          dailyTransactions: data.invoices,
        });
      })
      .catch((e) => {
        console.log(e);
        e?.response?.status === 401
          ? navigate("/signin")
          : navigate("/dashboard");
      });
  }
  useEffect(() => {
    getData();
  }, [isOpen]);

  return (
    <div className="relative tracking-normal flex flex-col bg-slate-900 min-h-screen">
      <Header2 />
      <div className="bg-white rounded-t-3xl h-screen pt-4">
        <p className="text-center pb-3 font-semibold">TODAY'S BUDGET LEFT</p>
        <Rulebox
          needs={dashboardData.needs}
          wants={dashboardData.wants}
          saving={dashboardData.savings}
        />
        <div className="pt-6 pb-4">
          <p className="text-center pb-3 font-semibold ">
            TODAY'S TRANSACTIONS
          </p>
          <Expenses transactions={dashboardData.dailyTransactions} />
        </div>
      </div>
      <div className="relative">
        <AddExpense
          isOpen={isOpen}
          handleAddExpenseOpenClose={handleAddExpenseOpenClose}
        />
        {isOpen && (
          <button
            className="fixed top-24 right-0 p-2 rounded-lg mr-2 mt-2 bg-indigo-400 z-50 transition ease-in-out duration-300"
            onClick={handleAddExpenseOpenClose}>
            X
          </button>
        )}
      </div>
      <div className={`${isOpen ? "invisible" : ""}`}>
        <button
          className="fixed bg-teal-500 z-0 inset-x-0 bottom-0 h-16 rounded-t-lg"
          onClick={handleAddExpenseOpenClose}>
          <p className="text-white font-bold text-xl">ADD EXPENSE</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
// kalukheshridhar24@gmail.com
