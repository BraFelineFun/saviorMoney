import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import sortByField from "../../Helpers/sortByField";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import getExpenseKey from "../ExpenseItem/getExpenseKey";
import cl from './expensesList.module.css'
import Header from "../UI Components/Header/Header";
import Select from "../UI Components/Select/Select";
import arrow from '../../Resources/img/arrow-expand.png';

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
        <div className={!expandContainer? cl.expenseContainer : `${cl.expenseContainer} ${cl.containerExpended}`}>
            <div className="header">
                <div className="header_title">
                    <div className={expandContainer? cl.showIcon: `${cl.showIcon} ${cl.flipped}`}>
                        <img
                            onClick={() => setExpandContainer(!expandContainer)}
                            src={arrow}
                            alt='toggle expenses list'
                        />
                    </div>
                    <Header title="Список трат">
                        <Select selectObject={selectObject} selected={sortField} setSelected={setSortField}/>
                    </Header>
                </div>

            </div>

            {expandContainer &&
                <div className={cl.expenseList}>
                    {sortedExpenses.map((expense)=>
                        <div key={getExpenseKey(expense)}>
                            <div className={cl.expenseCategoryMarker}>
                                <div style={{backgroundColor: expense.color}} className={cl.expenseColor}></div>
                                <div>{expense.category}</div>
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