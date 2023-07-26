import React, {FC} from 'react';
import cl from "./CardDetail.module.css";
import {CSSTransition} from "react-transition-group";
import ExpenseItem from "../../ExpenseItem/ExpenseItem";
import getExpenseKey from "../../ExpenseItem/getExpenseKey";
import ICategory from "../../../Models/ICategory";

interface CardDetailProps {
    spending: ICategory;
    isExpandCard: boolean;
}

const CardDetail: FC<CardDetailProps> = ({spending, isExpandCard}) => {

    return (
        //TODO: css transition doesnt work, Make Collapse more Reusable and use it here
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
                        <ExpenseItem key={getExpenseKey(expense)} category={spending.category} {...expense}/>
                    )
                }
            </div>


        </CSSTransition>
    );
};

export default React.memo(CardDetail);