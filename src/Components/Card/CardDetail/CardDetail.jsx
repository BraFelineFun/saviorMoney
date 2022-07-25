import React from 'react';
import cl from "./CardDetail.module.css";
import dateToString from "../../../Helpers/dateToString";
import {CSSTransition} from "react-transition-group";
import cashNumberToString from "../../../Helpers/cashNumberToString";
import {useDispatch} from "react-redux";

import deleteImg from "../../../Resources/img/delete.png"
import {removeExpanse} from "../../../Store/Slices/SpendingsSlice";


const CardDetail = ({spending, isExpandCard}) => {
    const dispatch = useDispatch();

    function doSomething (e){
        e.stopPropagation()
    }

    function deleteExpense(category, key){
        dispatch(removeExpanse({category, key}))
    }

    return (
        <CSSTransition
            key={spending.category}
            in={isExpandCard}
            timeout={200}
            classNames="expandList"
            unmountOnExit
        >
            <div className={cl.card_expand}>

                {spending.expenses.map((expense) =>{
                    const time = dateToString(expense.date);
                    const key = +(new Date(expense.date));
                    return(
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={cl.card_detailItem}
                            key={key}
                        >
                            <div className={cl.item}>
                                <div className={cl.item_holder}>
                                    <div className={cl.item_description}>
                                        <div>{expense.description}</div>
                                        <div className={cl.time}>{[time[0], time[1]].join(" ")}</div>
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
                                <div onClick={() => deleteExpense(spending.category, key)}
                                    className={cl.removeItem}
                                >
                                    <img src={deleteImg} alt="delete item"/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )}
                )}
            </div>
        </CSSTransition>
    );
};

export default CardDetail;