import React, {FC} from 'react';
import cl from "./categoryCardDetail.module.css";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import getExpenseKey from "../ExpenseItem/getExpenseKey";
import ICategory from "../../Models/ICategory";
import CollapseTransition from "../UI Components/Collapse/CollapseTransition/CollapseTransition";

interface CardDetailProps {
    spending: ICategory;
    isExpandCard: boolean;
}

const CategoryCardDetail: FC<CardDetailProps> = ({spending, isExpandCard}) => {

    return (
        <CollapseTransition isExpanded={isExpandCard}>
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
        </CollapseTransition>
    );
};

export default React.memo(CategoryCardDetail);