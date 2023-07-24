import React from 'react';
import dateToString from "../../Helpers/dateToString";
import cl from "./expenseItem.module.css"
import cashNumberToString from "../../Helpers/cashNumberToString";
import deleteImg from "../../Resources/img/delete.png";
import {removeExpanse} from "../../Store/Slices/SpendingsSlice";
import getExpenseKey from "./getExpenseKey";
import useAppDispatch from "../../Hooks/useAppDispatch";

const ExpenseItem = ({expense, category}) => {

    const dispatch = useAppDispatch();
    const {date, time} = dateToString(expense.date);
    const key = getExpenseKey(expense);

    function deleteExpense(category, key){
        dispatch(removeExpanse({category, key}))
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={cl.card_detailItem}
        >
            <div className={cl.item}>
                <div className={cl.item_holder}>
                    <div className={cl.item_description}>
                        <div>{expense.description}</div>
                        <div className={cl.time}>{[date, time].join(" ")}</div>
                    </div>
                    <div className={cl.item_money}>
                        <b>
                            RUB
                            <div className="moneyDisplay">
                                {cashNumberToString(expense.money)}
                            </div>
                        </b>
                    </div>
                </div>
                <div onClick={() => deleteExpense(category, key)}
                     className={cl.removeItem}
                >
                    <img src={deleteImg} alt="delete item"/>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default React.memo(ExpenseItem);