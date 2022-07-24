import React, {useState} from 'react';
import './category.css'
import Card from "./Card";
import RoundButton from "../UI Components/RoundButton/RoundButton";
import FormCategory from "../FormAdd/FormCategory";

const Category = () => {

    const [sort, setSort] = useState("");
    const [showForm, setShowForm] = useState(false);

    function toggleShowForm(){
        setShowForm(!showForm);
    }

    function sortF(sort){
        setSort(sort);
    }

    return (
        <div className="card">
            <div className="buttonAddCategory">
                <RoundButton callback={toggleShowForm}/>
            </div>

            <div className="headWrapper wrapperPadding">
                <div className="headTitle">
                    <h2>Категории</h2>
                </div>
                <div className="select">
                    <select onChange={(e)=>
                        sortF(e.target.value)}
                        value={sort}
                        name="sort"
                    >

                        <option disabled value="">Сортировка по</option>
                        <option value="categoryName">
                            По названию
                        </option>
                        <option value="summaryMoney">
                            По сумме
                        </option>

                    </select>
                </div>
            </div>

            <main className="wrapperPadding">
                <Card sort={sort}/>
                <Card sort={sort}/>
                <Card sort={sort}/>
                {showForm &&<div className="formAddCategory">
                     <FormCategory callback={toggleShowForm}/>
                </div>}
            </main>

        </div>
    );
};

export default Category;