import React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addCategory} from "../../Store/Slices/SpendingsSlice";

const FormCategory = () => {

    const [color, setColor] = useState(getRandomColor(toString()));
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function addNewCategory(){
        dispatch(addCategory({category: category, color: color, money: 0}))
    }

    return (
        <div className="addCategory">
            <div className="inputField">
                <label htmlFor="category">Введите новую категорию трат:</label>
                <input
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    type="text"/>
            </div>
            <div className="inputField">
                <label htmlFor="color">Выберите цвет:</label>
                <input
                    id="color"
                    onChange={(e) => setColor(e.target.value)}
                    value={color}
                    type="color"/>
            </div>
            <button onClick={addNewCategory}>
                Добавить
            </button>
        </div>
    );
};

export default FormCategory;