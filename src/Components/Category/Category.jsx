import React, {createContext, useState} from 'react';
import './category.css'
import Card from "../Card/Card";
import RoundButton from "../UI Components/RoundButton/RoundButton";
import FormCategory from "../FormAdd/FormCategory";
import useToggle from "../../Hooks/useToggle";
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";

export const EditCategoryContext = createContext(null);

const Category = () => {

    const [sortField, setSortField] = useState("");
    const [isShowForm, toggleShowForm] = useToggle(false);
    const [editCategory, setEditCategory] = useState(null);

    function toggleFormSetDefault(){
        if (editCategory !== null)
            setEditCategory(null);
        else
            toggleShowForm();
    }

    return (
        <div className="card">
            {/*<div className="buttonAddCategory">*/}
            {/*    <RoundButton callback={toggleFormSetDefault}/>*/}
            {/*</div>*/}

            <div className="headWrapper wrapperPadding">
                <div className="headTitle">
                    <h2>Категории</h2>
                </div>
                <div className="select">
                    <select onChange={(e)=>
                        setSortField(e.target.value)}
                        value={sortField}
                        name="sort"
                    >

                        <option disabled value="">Сортировка по</option>
                        <option value="category">
                            По названию
                        </option>
                        <option value="summaryMoney">
                            По сумме
                        </option>

                    </select>
                </div>
            </div>

            <EditCategoryContext.Provider value={[editCategory, setEditCategory]}>
                <main  className="wrapperPadding category_main">
                    <SwitchComponents
                        switchTitle={editCategory? "Изменить категорию": "Добавить категорию"}
                        switchKey={isShowForm || editCategory !== null}
                        SwitchComponent={<FormCategory callback={toggleShowForm}/>}
                        SwitchedComponent={<Card  sortField={sortField}/>}
                    />
                </main>
            </EditCategoryContext.Provider>

        </div>
    );
};

export default Category;