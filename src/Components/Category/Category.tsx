import React, {ChangeEvent, Context, createContext, Dispatch, FC, SetStateAction, useState} from 'react';
import './category.css'
import Card from "../Card/Card";
import FormCategory from "../FormAdd/FormCategory";
import useToggle from "../../Hooks/useToggle";
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";
import Header from "../UI Components/Header/Header";
import Select, {SelectValueType} from "../UI Components/Select/Select";
import SelectItem from "../UI Components/Select/SelectItem";
import ICategory from "../../Models/ICategory";
import {editCategory} from "../../Store/Slices/SpendingsSlice";

export type categoryContextValueType = [ICategory | null, Dispatch<SetStateAction<ICategory | null>>] | null
export const EditCategoryContext = createContext<categoryContextValueType>(null);

const Category: FC = () => {

    const [sortField, setSortField] = useState<string>("");
    const [isShowForm, toggleShowForm] = useToggle(false);
    const [editCategory, setEditCategory] = useState<ICategory | null>(null);


    function toggleFormSetDefault(): void {
        if (editCategory !== null) {
            setEditCategory(null);
        }
        else {
            toggleShowForm();
        }
    }

    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
        setSortField(e.target.value);
    }


    return (
        <div className="card">

            <Header title={"Категории"}>
                <Select title='Сортировка по' value={sortField} onChange={handleSelectChange}>
                    <SelectItem value='category'>По названию</SelectItem>
                    <SelectItem value='summaryMoney'>По сумме</SelectItem>
                </Select>
            </Header>

            <EditCategoryContext.Provider value={[editCategory, setEditCategory]}>
                <main className="wrapperPadding category_main">
                    <SwitchComponents
                        switchTitle={editCategory ? "Изменить категорию" : "Добавить категорию"}
                        switchKey={isShowForm || editCategory !== null}
                        setSwitchKey={toggleFormSetDefault}
                        SwitchComponent={<Card sortField={sortField}/>}
                        SwitchedComponent={<FormCategory callback={toggleFormSetDefault}/>}
                    />
                </main>
            </EditCategoryContext.Provider>

        </div>
    );
};

export default Category;