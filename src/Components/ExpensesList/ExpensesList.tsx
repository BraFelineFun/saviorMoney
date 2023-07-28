import React, {ChangeEvent, useMemo, useState} from 'react';
import sortByField from "../../Helpers/sortByField";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import getExpenseKey from "../ExpenseItem/getExpenseKey";
import cl from './expensesList.module.css'
import Header from "../UI Components/Header/Header";
import Select from "../UI Components/Select/Select";
import useAppSelector from "../../Hooks/useAppSelector";
import SelectItem from "../UI Components/Select/SelectItem";
import {IExpenseWithCategory} from "../../Models/IExpenseWithCategory";


const arrow = require('../../Resources/img/arrow-expand.png');
const ExpensesList = () => {

    const spendings = useAppSelector(state => state.spendings);
    const [sortField, setSortField] = useState<string>("");
    const [expandContainer, setExpandContainer] = useState<boolean>(false);

    function onChangeSelect (e: ChangeEvent<HTMLSelectElement>) {
        setSortField(e.target.value);
    }

    const expenses: IExpenseWithCategory[] = useMemo(() => {
        const expList: IExpenseWithCategory[] = [];
        spendings.forEach((spending) =>
            spending.expenses.forEach((expense) => {
                expList.push({...expense, category: spending.category, color: spending.color})
            })
        )
        return expList;
    }, [spendings])

    const sortedExpenses: IExpenseWithCategory[] = useMemo(() => {
        if (sortField === 'date')
            return sortByField(sortField, expenses, 'Date');
        else
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
                        <Select title='Сортировка по' value={sortField} onChange={onChangeSelect}>
                            <SelectItem value='description'>По названию</SelectItem>
                            <SelectItem value='money'>По сумме</SelectItem>
                            <SelectItem value='date'>По дате</SelectItem>
                        </Select>
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

                            <ExpenseItem {...expense}/>
                        </div>

                    )}
                </div>
            }

        </div>
    );
};

export default React.memo(ExpensesList);