import React, { useEffect,useState,useCallback } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
} from "@chakra-ui/react";
function Income() {
  const { incomes, getIncomes, totalIncome } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/signin");
      return;
    }
    getIncomes();
  }, []);
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
})

const handleDuplicateClicked = useCallback((income)=>{
  const { title, amount, date, category, description } = income;
  setInputState({
    title,
    amount,
    date: new Date(date),
    category,
    description
});
},[]);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <h2 className="total-income">
          Total Income: <span>${totalIncome()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
          <Form defaultData={inputState}/>
          </div>
          <div className="incomes">
            <Accordion allowMultiple allowToggle>
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  onDuplicateClicked = {()=>handleDuplicateClicked(income)}
                />
              );
            })}
              </Accordion>
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
      height:70vh;
      overflow: auto;
      padding-right: 20px;
  margin-right: -20px;
    }
  }
`;

export default Income;
