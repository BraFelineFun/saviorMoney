import React from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addExpense} from "../../Store/Slices/SpendingsSlice";
import {CSSTransition} from "react-transition-group";
import useToggle from "../../Hooks/useToggle";

const FormSpending = () => {

    const [spentSum, setSpentSum] = useState("0");
    const [chosenCategory, setChosenCategory] = useState("");
    const [description, setDescription] = useState("");

    const [expandList, toggleExpandList] = useToggle(false);

    const spendings = useSelector(state => state.spendings)
    const dispatch = useDispatch();

    function checkNumberInput(value){
        if ((/\d*/g).test(value))
            setSpentSum(value)
    }

    function addSpendings(){
        if (chosenCategory === "") return;
        const spentSumNum = Number(spentSum);
        dispatch(addExpense({spentSumNum, chosenCategory, description}))

    }


    return (
        <div className="addSpendings">
            <div className="categoryList">
                <div className="categoryListTitle"
                     onClick={toggleExpandList}
                >
                    Категории:
                </div>
                <CSSTransition in={expandList} timeout={200} classNames="expandList" unmountOnExit>
                    <div>
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
                    </div>
                </CSSTransition>
            </div>

            <div className="inputField">
                <label htmlFor="spentSum">Введите сумму:</label>
                <input
                    id="spentSum"
                    onChange={(e) => checkNumberInput(e.target.value)}
                    value={spentSum}
                    type="number"/>
            </div>
            <div className="inputField">
                <label htmlFor="description">Введите описание:</label>
                <input
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"/>
            </div>
            <button onClick={ addSpendings }>
                Добавить
            </button>
        </div>
    );
};

export default FormSpending;