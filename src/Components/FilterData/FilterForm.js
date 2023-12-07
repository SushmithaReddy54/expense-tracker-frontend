import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Button from '../Button/Button';
import { dateFormat } from "../../utils/dateFormat";
import { calender, comment, trash, duplicate } from "../../utils/Icons";
import { DeleteModal } from "../ConfirmationModals/DeleteModal";
import {
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Box,
  AccordionItem,
  Accordion,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../context/globalContext";

export default function FilterForm() {
  const { filteredIncomeAndExpense, filteredData } = useGlobalContext();

  const [minDate, setMinDate] = useState(new Date(new Date().setDate(new Date().getDate() - 10)));
  const [maxDate, setMaxDate] = useState(new Date());
  const [error, setError] = useState(false);
  const showData = (e) => {
    e.preventDefault();
    setError(false);
    console.log(minDate.getTime()>=maxDate.getTime());
    if(minDate.getTime()>= maxDate.getTime()){
        setError(true);
        return;
    }
    filteredIncomeAndExpense(minDate, maxDate);
  };
  return (
    <FormStyled>
      <InnerLayout>
        <h2 className="total-income">View Transaction History</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div className="input-control">
            <DatePicker
              id="date"
              className="date-picker"
              placeholderText="Enter A Date"
              selected={minDate}
              onChange={(date) => {
                setError(false);
                setMinDate(date);
              }}
            />
          </div>
          <h5>to</h5>
          <div className="input-control">
            <DatePicker
              id="date"
              className="date-picker"
              placeholderText="Enter A Date"
              selected={maxDate}
              onChange={(date) => {
                setError(false);
                setMaxDate(date);
              }}
            />
          </div>
          <div className="submit-btn">
            <Button
              name={"Filter"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              onClick={showData}
            >
        
            </Button>
          </div>
        </div>
        {error && <p className='error'>please select correct dates</p>}

      </InnerLayout>
      <div style={{ width: "100%" }}>
        {filteredData && (
          <Accordion allowMultiple allowToggle>
            {filteredData.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              const showType = type === "expense" ? "EXPENSE" : "INCOME";
              return (
                <IncomeItemStyled>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="h5" textAlign="left" width="100%">
                          {category} : {title} - ${amount} ({showType})
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <p>
                        {calender} {dateFormat(date)}
                      </p>
                      <p>
                        {comment}
                        {description}
                      </p>
                    </AccordionPanel>
                  </AccordionItem>
                </IncomeItemStyled>
              );
            })}
          </Accordion>
        )}
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin: 20px;
  align-items: center;
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
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .react-datepicker-wrapper: {
    width: "100%";
  }
  ,
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 0.4rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }
  .expanded-panel {
    display: block !important;
  }

  /* Additional styles for expanded state */
  .expanded {
    background-color: lightblue !important;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;
