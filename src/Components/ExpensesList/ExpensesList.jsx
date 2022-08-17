import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import sortByField from "../../Helpers/sortByField";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import getExpenseKey from "../ExpenseItem/getExpenseKey";

const ExpensesList = () => {

    const spendings = useSelector(state => state.spendings);


    const expenses = useMemo(()=>{
        const expList = [];
        spendings.forEach((spending) =>
            spending.expenses.forEach((expense) => {
                expList.push({...expense, category: spending.category})
            })
        )

        return sortByField('money', expList);

    },[spendings])

    return (
        <div>
            {expenses.map((expense)=>
                <ExpenseItem key={getExpenseKey(expense)} expense={expense} category={expense.category}/>
            )}
        </div>
    );
};

export default React.memo(ExpensesList);