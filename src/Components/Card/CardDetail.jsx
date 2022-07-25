import React from 'react';
import cl from "./card.module.css";
import dateToString from "../../Helpers/dateToString";

const CardDetail = ({spending}) => {

    return (
        <div className={cl.card_expand}>

            {spending.expenses.map((expense) =>{
                const time = dateToString(expense.date);
                return(
                    <div key={+(new Date(expense.date))}>
                        <div>
                            <div>{expense.description}</div>
                            <div>{expense.money} RUB</div>
                            <div>{[time[0], time[1]].join(" ")}</div>
                        </div>
                        <hr/>
                    </div>
                )}
            )}

        </div>
    );
};

export default CardDetail;