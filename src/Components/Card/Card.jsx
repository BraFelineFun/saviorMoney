import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import cl from "./card.module.css"
import CardDetail from "./CardDetail/CardDetail";
import MoreButton from "../UI Components/MoreButton/MoreButton";
import {removeCategory} from "../../Store/Slices/SpendingsSlice";
import cashNumberToString from "../../Helpers/cashNumberToString";

const Card = ({sort}) => {

    const spendingsState = useSelector(state => state.spendings)
    const [expandCardCategory,setExpandCardCategory] = useState([]);
    const dispatch = useDispatch();

    const spendings = useMemo(() =>{
        if (!sort) return spendingsState;

        if (sort === "summaryMoney")
            return [...spendingsState].sort((a,b) => (b.summaryMoney - a.summaryMoney))

        if (sort === "categoryName")
            return[...spendingsState].sort((a,b) => (a.category.localeCompare(b.category)))

    }, [spendingsState, sort])

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

    return (
        <>
            { !spendings.length?
                <h3>Пока что нет ни одной категории</h3>
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
                                    removeCategory={removeCategoryContext(spending.category)}
                                />
                            </div>
                        </div>
                            <CardDetail
                                isExpandCard={isIncluded}
                                spending={spending}
                            />
                    </div>)
                })
            }
        </>
    );
};

export default Card;