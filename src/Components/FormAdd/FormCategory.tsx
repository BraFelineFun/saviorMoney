import React, {FC, useContext} from 'react';
import {useState} from "react";
import {addCategory, editCategory} from "../../Store/Slices/SpendingsSlice";
import cl from "./formCategory.module.css"
import getRandomColor from "../../Helpers/getRandomColor";
import {EditCategoryContext} from "../Category/Category";
import useAppSelector from "../../Hooks/useAppSelector";
import useAppDispatch from "../../Hooks/useAppDispatch";
import ICategory from "../../Models/ICategory";
const refresh = require('../../Resources/img/refresh.png');

interface FormCategoryProps {
    callback?: () => void;
}

const FormCategory: FC<FormCategoryProps> = ({callback}) => {
    const [toEditCategory, setToEditCategory] = useContext(EditCategoryContext) ?? [null, null];

    const [color, setColor] = useState<string>(toEditCategory?.color || getRandomColor());
    const [category, setCategory] = useState<string>(toEditCategory?.category || "");
    const [spin, setSpin] = useState<boolean>(false);//TODO: Сделать хук через ref?

    const dispatch = useAppDispatch();
    const spendings = useAppSelector(state => state.spendings)

    function editCurrentCategory(){
        if (!toEditCategory) {
            console.error('UNEXPECTED NULL CONTEXT');
            return;
        }

        const oldCategory = toEditCategory.category;
        dispatch(editCategory({oldCategory, category, color}))
        setToEditCategory(null);
    }

    function addNewCategory(){
        if (category === "") {
            alert("Введите название категории");
            return;
        }
        if (spendings.find((spending: ICategory) => spending.category === category)){
            alert("Такая категория уже существует");
            setCategory("");
            return;
        }
        dispatch(addCategory(
            {category, color: color, summaryMoney: 0, expenses: []}
        ))

        if (callback) {
            callback();
        }
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
            <button onClick={categoryChooseAction} >
                Добавить
            </button>
        </div>
    );
};

export default FormCategory;