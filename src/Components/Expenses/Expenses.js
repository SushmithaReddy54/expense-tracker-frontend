import React, { useCallback, useEffect,useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { useNavigate } from 'react-router-dom';
import {Accordion} from '@chakra-ui/react';

function Expenses() {
    const {addIncome,expenses, getExpenses, totalExpenses} = useGlobalContext()
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/signin');
            return;
        }
        getExpenses()
    }, [])
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
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expense</h1>
                <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm defaultValue = {inputState}/>
                    </div>
                    <div className="incomes">
                    <Accordion allowMultiple position='relative'>
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
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
                        })}
                    </Accordion>
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
            
        }
    }
`;

export default Expenses
