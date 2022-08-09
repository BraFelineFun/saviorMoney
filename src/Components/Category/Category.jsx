import React, {createContext, useState} from 'react';
import './category.css'
import Card from "../Card/Card";
import RoundButton from "../UI Components/RoundButton/RoundButton";
import FormCategory from "../FormAdd/FormCategory";
import useToggle from "../../Hooks/useToggle";
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";
import Header from "../UI Components/Header/Header";

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

            <Header title={"Категории"}>
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