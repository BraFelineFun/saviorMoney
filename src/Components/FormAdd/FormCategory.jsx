import React, {useContext} from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, editCategory} from "../../Store/Slices/SpendingsSlice";
import cl from "./formCategory.module.css"
import getRandomColor from "../../Helpers/getRandomColor";
import {EditCategoryContext} from "../Category/Category";
import refresh from '../../Resources/img/refresh.png'

const FormCategory = ({callback}) => {
    const [toEditCategory, setToEditCategory] = useContext(EditCategoryContext);

    const [color, setColor] = useState(toEditCategory?.color || getRandomColor());
    const [category, setCategory] = useState(toEditCategory?.category || "");
    const [spin, setSpin] = useState(false);//TODO: Сделать хук через ref?

    const dispatch = useDispatch();
    const spendings = useSelector(state => state.spendings)

    function editCurrentCategory(){
        const oldCategory = toEditCategory.category;
        dispatch(editCategory({oldCategory, category, color}))
        setToEditCategory(null);
    }

    function addNewCategory(){
        if (category === "") {
            alert("Введите название категории");
            return;
        }
        if (spendings.find((spending) => spending.category === category)){
            alert("Такая категория уже существует");
            setCategory("");
            return;
        }
        dispatch(addCategory(
            {category: category, color: color, summaryMoney: 0, expenses: []}
        ))
        callback();
    }

    function categoryChooseAction(){
        if (toEditCategory !== null)
            editCurrentCategory();
        else
            addNewCategory();
    }

    return (
        <div className={cl.form + " wrapperPadding"}>
            <div className={cl.inputField}>
                <label htmlFor="category">Введите категорию трат:</label>
                <input
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    type="text"/>
            </div>
            <div className={cl.inputField}>
                <label htmlFor="color">Выберите цвет:</label>
                <input
                    id="color"
                    onChange={(e) => setColor(e.target.value)}
                    value={color}
                    type="color"/>

                <img onClick={() => {
                    setColor(getRandomColor());
                    setSpin(true);
                    setTimeout(() => setSpin(false), 300)
                }}
                    className={spin? cl.spin: ""}
                    src={refresh}
                    alt="refresh color"
                />
            </div>
            <button

                onClick={categoryChooseAction}
            >
                Добавить
            </button>
        </div>
    );
};

export default FormCategory;