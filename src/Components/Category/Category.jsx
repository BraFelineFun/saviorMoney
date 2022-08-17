import React, {createContext, useState} from 'react';
import './category.css'
import Card from "../Card/Card";
import RoundButton from "../UI Components/RoundButton/RoundButton";
import FormCategory from "../FormAdd/FormCategory";
import useToggle from "../../Hooks/useToggle";
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";
import Header from "../UI Components/Header/Header";
import Select from "../UI Components/Select/Select";

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

    const selectObject = {title: "Сортировка по", options: [
            {value: "category", description: "По названию"},
            {value: "summaryMoney", description: "По сумме"}
    ]}

    return (
        <div className="card">

            <Header title={"Категории"}>
                <Select selectObject={selectObject} selected={sortField} setSelected={setSortField}/>
            </Header>

            <EditCategoryContext.Provider value={[editCategory, setEditCategory]}>
                <main  className="wrapperPadding category_main">
                    <SwitchComponents
                        switchTitle={editCategory? "Изменить категорию": "Добавить категорию"}
                        switchKey={isShowForm || editCategory !== null}
                        setSwitchKey={toggleFormSetDefault}
                        SwitchComponent={<Card  sortField={sortField}/>}
                        SwitchedComponent={<FormCategory callback={toggleFormSetDefault}/>}
                    />
                </main>
            </EditCategoryContext.Provider>

        </div>
    );
};

export default Category;