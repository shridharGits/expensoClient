import axios from "axios";
import React, { useState } from "react";
import { HOST_URL } from "./Constants";

const AddExpense = ({ isOpen }) => {
  // initial expense date
  const initialState = {
    description: "",
    needs: "",
    wants: "",
    totalPrice: "",
    expenseDate: new Date(),
  };
  // to manage to divide the expense or not
  const [isDivide, setIsDivide] = useState(false);
  // to manage all expense data
  const [expenseData, setExpenseData] = useState(initialState);
  // to manage the need or want
  const [selectedValue, setSelectedValue] = useState("needsTotal");

  const handleDivide = () => {
    setExpenseData((prevState) => ({
      ...prevState,
      ["needs"]: "",
      ["wants"]: "",
      ["totalPrice"]: "",
    }));
    setIsDivide(!isDivide);
  };

  // on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(`${HOST_URL}/invoices/add`, JSON.stringify(expenseData), {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;
    // date
    if (name == "expenseDate") {
      newValue = new Date(value);
    }
    // if totalPrice then empty needs and wants, and fill needs or wants
    else if (name == "totalPrice") {
      setExpenseData((prevState) => ({
        ...prevState,
        ["needs"]: "",
        ["wants"]: "",
        [selectedValue == "needsTotal" ? "needs" : "wants"]: value,
        [name]: value,
      }));
    }
    // if need or wants, empty totalPrice
    else if (name == "needs" || name == "wants") {
      setExpenseData((prevState) => ({
        ...prevState,
        ["totalPrice"]: "",
        [name]: value,
      }));
    } else {
      setExpenseData((prevState) => ({
        ...prevState,
        [name]: newValue ?? value,
      }));
    }
  };

  const handleTotalPriceRule = (e) => {
    const name = e.target.value;
    if (name == "needsTotal") {
      console.log(expenseData);
      setExpenseData((prevState) => ({
        ...prevState,
        ["needs"]:
          prevState.wants.length > 0 ? prevState.wants : prevState.needs,
        ["wants"]: "",
      }));
    } else {
      console.log(name);
      setExpenseData((prevState) => ({
        ...prevState,
        ["wants"]:
          prevState.needs.length > 0 ? prevState.needs : prevState.wants,
        ["needs"]: "",
      }));
    }
    setSelectedValue(name);
  };

  const inputCss =
    "h-10 mt-5 border-solid border-2 border-indigo-400 rounded-lg p-2";
  return (
    <div
      className={`${
        isOpen ? "translate-y-0" : "translate-y-full"
      } z-60 top-24 w-full h-full rounded-t-3xl text-lg bg-white fixed transition ease-in-out duration-300`}>
      <p className="text-center pt-3 font-semibold">ADD EXPENSE</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Description"
            className={`h-10 w-4/5 ${inputCss}`}
            value={expenseData.description}
            required
            name="description"
            onChange={handleChange}
          />
          <div className="flex flex-col w-4/5 mt-5">
            <input
              onClick={handleDivide}
              type="button"
              value={isDivide ? "ADD TOTAL" : "DIVIDE IN NEED & WANT"}
            />
            {!isDivide ? (
              <div className={`flex flex-row justify-between items-center`}>
                <select
                  className="h-10 inline-block align-middle"
                  value={selectedValue}
                  onChange={handleTotalPriceRule}>
                  <option value="needsTotal">NEED</option>
                  <option value="wantsTotal">WANT</option>
                </select>
                <input
                  type="number"
                  className={`w-2/3 ${inputCss} inline-block align-middle mt-0`}
                  placeholder="TOTAL PRICE"
                  name="totalPrice"
                  required
                  value={expenseData.totalPrice}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="flex flex-row justify-between">
                <input
                  type="number"
                  className={`${inputCss} w-2/5`}
                  placeholder="NEEDED"
                  name="needs"
                  value={expenseData.needs}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  className={`${inputCss} w-2/5`}
                  placeholder="WANTED"
                  name="wants"
                  value={expenseData.wants}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <input
            type="date"
            name="expenseDate"
            className={`w-4/5 ${inputCss}`}
            value={expenseData?.expenseDate?.toISOString()?.split("T")[0]}
            onChange={handleChange}
          />
        </div>
        <input
          className="fixed z-60 bg-red-500 inset-x-0 bottom-24 h-16 rounded-t-lg font-bold text-xl text-white"
          value="ADD EXPENSE"
          type="SUBMIT"
        />
      </form>
      <p>desc: {JSON.stringify(expenseData.description)}</p>
      <p>date: {JSON.stringify(expenseData.expenseDate)}</p>
      <p>needs: {JSON.stringify(expenseData.needs)}</p>
      <p>wants: {JSON.stringify(expenseData.wants)}</p>
      <p>total: {JSON.stringify(expenseData.totalPrice)}</p>
    </div>
  );
};

export default AddExpense;
