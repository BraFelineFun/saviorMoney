import React from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addExpense} from "../../Store/Slices/SpendingsSlice";

const FormSpending = () => {

    const [spentSum, setSpentSum] = useState("0");
    const [chosenCategory, setChosenCategory] = useState("");

    const spendings = useSelector(state => state.spendings)
    const dispatch = useDispatch();

    function checkNumberInput(value){
        if ((/\d*/g).test(value))
            setSpentSum(value)
    }

    function addSpendings(){
        if (chosenCategory === "") return;
        dispatch(addExpense({spentSum, chosenCategory}))
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