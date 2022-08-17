import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import sortByField from "../../Helpers/sortByField";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import getExpenseKey from "../ExpenseItem/getExpenseKey";
import './expensesList.css'
import Header from "../UI Components/Header/Header";
import Select from "../UI Components/Select/Select";

const ExpensesList = () => {

    const spendings = useSelector(state => state.spendings);
    const [sortField, setSortField] = useState("");
    const [expandContainer, setExpandContainer] = useState(false);
    const selectObject = {title: "Сортировка по", options: [
            {value: "description", description: "По названию"},
            {value: "money", description: "По сумме"},
            {value: "date", description: "По дате"}
    ]}

    const expenses = useMemo(() => {
        const expList = [];
        spendings.forEach((spending) =>
            spending.expenses.forEach((expense) => {
                expList.push({...expense, category: spending.category, color: spending.color})
            })
        )
        return expList;
    }, [spendings])

    const sortedExpenses = useMemo(() => {
        //TODO: сортировка по дате
        return sortByField(sortField, expenses);
    },[expenses, sortField])


    return (
        <div className={!expandContainer? "expenseContainer": "expenseContainer" + " containerExpended"}>
            <div className="header">
                <div className="header_title">
                    <div className="showIcon">
                        <span
                            onClick={() =>
                                setExpandContainer(!expandContainer)}
                        >
                            expand
                        </span>
                    </div>
                    <Header title={"Список трат"}>
                        <Select selectObject={selectObject} selected={sortField} setSelected={setSortField}/>
                    </Header>
                </div>

            </div>

            {expandContainer &&
                <div className="expenseList">
                    {sortedExpenses.map((expense)=>
                        <div
                            className="expense"
                            key={getExpenseKey(expense)}
                        >
                            <div className="expenseCategoryMarker">
                                <div style={{backgroundColor: expense.color}} className="expenseColor"></div>
                                <div className="expenseCategory">{expense.category}</div>
                            </div>

                            <ExpenseItem expense={expense} category={expense.category}/>
                        </div>

                    )}
                </div>
            }

        </div>
    );
};

export default React.memo(ExpensesList);