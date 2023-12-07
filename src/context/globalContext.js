import React, { useContext, useState } from "react";
import axios from "axios";

//export const BASE_URL = "http://localhost:5050/";
export const BASE_URL = "https://exptracker-backend.onrender.com/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  //calculate incomes
  const addIncome = async (income) => {
    const authToken = localStorage.getItem("jwt");
    await axios
      .post(`${BASE_URL}add-income`, income, {
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const authToken = localStorage.getItem("jwt");
    const response = await axios.get(`${BASE_URL}get-incomes`, {
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    });
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const authToken = localStorage.getItem("jwt");
    await axios.delete(`${BASE_URL}delete-income/${id}`, {
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    });
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    const authToken = localStorage.getItem("jwt");
    await axios
      .post(`${BASE_URL}add-expense`, income, {
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const authToken = localStorage.getItem("jwt");
    const response = await axios.get(`${BASE_URL}get-expenses`, {
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    });
    setExpenses(response.data);
  };

  const filteredIncomeAndExpense = async (minDate, maxDate) => {
    console.log("test");
    const authToken = localStorage.getItem("jwt");
    const response = await axios.get(`${BASE_URL}filteredData?minDate=${minDate}&maxDate=${maxDate}`, {
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    });
    setFilteredData(response.data);
  };

  const deleteExpense = async (id) => {
    const authToken = localStorage.getItem("jwt");
    await axios.delete(`${BASE_URL}delete-expense/${id}`, {
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    });
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 10);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        filteredData,
        totalIncome,
        addExpense,
        filteredIncomeAndExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
