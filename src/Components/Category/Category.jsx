import React, {useState} from 'react';
import './category.css'
import Card from "./Card";

const Category = () => {

    const [sort, setSort] = useState("");

    return (
        <div>
            <div className="headWrapper wrapperPadding">
                <div className="headTitle">
                    <h2>Категории</h2>
                </div>
                <div className="select">
                    <select onChange={(e)=> setSort(e.target.value)} defaultValue="default" name="sort">

                        <option disabled={true} value="default">Сортировка по</option>
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
            </main>

        </div>
    );
};

export default Category;