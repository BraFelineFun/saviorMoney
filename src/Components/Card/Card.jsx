import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import cl from "./card.module.css"
import CardDetail from "./CardDetail/CardDetail";
import MoreButton from "../UI Components/MoreButton/MoreButton";
import {removeCategory} from "../../Store/Slices/SpendingsSlice";
import cashNumberToString from "../../Helpers/cashNumberToString";
import useSort from "../../Hooks/useSort";
import Empty from "../UI Components/Empty/Empty";
import {EditCategoryContext} from "../Category/Category";

const Card = ({sortField}) => {

    const spendingsState = useSelector(state => state.spendings);
    const [expandCardCategory,setExpandCardCategory] = useState([]);
    const dispatch = useDispatch();

    const spendings = useSort(sortField, spendingsState);
    const [_, editCategory] =useContext(EditCategoryContext);

    function expandCardSetter(category){
        if(!expandCardCategory.includes(category))
            setExpandCardCategory([...expandCardCategory, category]);
        else
            setExpandCardCategory((prev) =>
                prev.filter((thisCategory) => category !== thisCategory
            ))
    }

    function removeCategoryContext(category){
        return function () {
            dispatch(removeCategory({category}))
        }
    }
    function toEditCategoryContext(spending){
        return function (){
            editCategory({category: spending.category, color: spending.color})
        }
    }

    return (
        <>
            { !spendings.length?
                <div className={cl.empty}>
                    <Empty emptyText={"Пока что нет ни одной категории"}/>
                </div>

                :
                spendings.map((spending) =>{

                    let isIncluded = expandCardCategory.includes(spending.category);
                    let color = {backgroundColor: spending.color};

                    return (<div
                        onClick={() => expandCardSetter(spending.category)}
                        key={spending.category}
                        style={color}
                        className={cl.cardSpending + " wrapperPadding"}
                    >
                        <div className={cl.card_main}>
                            <div
                                className={isIncluded?
                                    [cl.card_properties, cl.expendedCard].join(" "):
                                    cl.card_properties}
                            >

                                <div className={cl.card_name}>
                                    {spending.category}
                                </div>
                                <div className={cl.card_spentSum}>
                                    <b>
                                        <div className="">RUB</div>
                                        <div className="moneyDisplay">{cashNumberToString(spending.summaryMoney)}</div>
                                    </b>

                                </div>
                            </div>
                            <div className={cl.card_more}>
                                <MoreButton
                                    edit={toEditCategoryContext(spending)}
                                    removeCategory={removeCategoryContext(spending.category)}
                                />
                            </div>
                            </div>
                                <CardDetail
                                    isExpandCard={isIncluded}
                                    spending={spending}
                                />
                        </div>
                    )
                })
            }
        </>
    );
};

export default Card;