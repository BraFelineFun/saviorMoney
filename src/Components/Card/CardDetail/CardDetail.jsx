import React from 'react';
import cl from "./CardDetail.module.css";
import {CSSTransition} from "react-transition-group";
import ExpenseItem from "../../ExpenseItem/ExpenseItem";
import getExpenseKey from "../../ExpenseItem/getExpenseKey";


const CardDetail = ({spending, isExpandCard}) => {

    return (
        <CSSTransition
            key={spending.category}
            in={isExpandCard}
            timeout={200}
            classNames="expandList"
            unmountOnExit
        >
            <div className={cl.card_expand}>
                {!spending.expenses.length?
                    <div className={cl.card_detailItem}>
                        <h3>Пока что нет трат в этой категории</h3>
                    </div>
                    :
                    spending.expenses.map((expense) =>
                        <ExpenseItem key={getExpenseKey(expense)} expense={expense} category={spending.category}/>
                    )
                }
            </div>


        </CSSTransition>
    );
};

export default React.memo(CardDetail);