import React from 'react';
import {useState} from "react";

const FormSpending = ({spendings, setSpendings}) => {

    const [spentSum, setSpentSum] = useState("0");
    const [chosenCategory, setChosenCategory] = useState("");

    function checkNumberInput(value){
        if ((/\d*/g).test(value))
            setSpentSum(value)
    }

    function addSpendings(){
        const index = spendings.findIndex(obj => obj.category === chosenCategory);
        const toUpdateCategory = spendings[index];
        toUpdateCategory.money += Number(spentSum);
        const toUpdateSpendings = [...spendings];
        toUpdateSpendings[index] = toUpdateCategory;
        setSpendings(toUpdateSpendings);
    }

    return (
        <div className="addSpendings">
            {
                spendings.map(({category}) =>
                    <div
                        className={category === chosenCategory? "--active" : ""}
                        onClick={() => setChosenCategory(category)}
                        key={category}
                    >
                        {category}
                    </div>
                )
            }
            <div className="inputField">
                <label htmlFor="spentSum">Введите сумму:</label>
                <input
                    id="spentSum"
                    onChange={(e) => checkNumberInput(e.target.value)}
                    value={spentSum}
                    type="number"/>
            </div>
            <button onClick={ addSpendings }>
                Добавить
            </button>
        </div>
    );
};

export default FormSpending;