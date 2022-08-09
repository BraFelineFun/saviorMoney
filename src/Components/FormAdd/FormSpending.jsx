import React from 'react';
import {useState} from "react";
import useToggle from "../../Hooks/useToggle";
import {useDispatch, useSelector} from "react-redux";
import {addExpense} from "../../Store/Slices/SpendingsSlice";
import {CSSTransition} from "react-transition-group";

import arrow from "../../Resources/img/arrow-expand.png"
import cl from './formCategory.module.css'


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
        if (chosenCategory === "") {
            alert("Выберете категорию");
            return;
        }
        if (spentSum <= 0) {
            alert("Введите сумму больше нуля")
            return;
        }
        if (description === ""){
            alert("Введите описание");
            return;
        }
        const spentSumNum = Number(spentSum);
        dispatch(addExpense({spentSumNum, chosenCategory, description}))

    }


    return (
        <div className={cl.form + " wrapperPadding"}>
            <div className={cl.categoryList}>
                <div className={cl.categoryListTitle}
                     onClick={toggleExpandList}
                >
                    <h2>Категории:</h2>
                    <img
                        className={expandList? cl.categoryExpandArrow: ""}
                        src={arrow}
                        alt="arrow to expand list"
                    />
                </div>
                {expandList && <hr/>}
                <CSSTransition in={expandList} timeout={200} classNames="expandList" unmountOnExit>
                    <div className={cl.categoryListContent}>
                        {
                            spendings.map(({category}) =>
                                //TODO: добавить маркер цвета
                                <div
                                    className={category === chosenCategory?
                                        [cl.__chosenCategory, cl.categoryItem].join(" ")
                                        : cl.categoryItem}
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

            <div className={cl.inputField}>
                <label htmlFor="spentSum">Введите сумму:</label>
                <input
                    id="spentSum"
                    onChange={(e) => checkNumberInput(e.target.value)}
                    value={spentSum}
                    type="number"/>
            </div>
            <div className={cl.inputField}>
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