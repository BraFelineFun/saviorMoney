import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";

import cl from "./card.module.css"
import {CSSTransition} from "react-transition-group";
import CardDetail from "./CardDetail";

const Card = ({sort}) => {

    const spendingsState = useSelector(state => state.spendings)
    const [isExpandCard,setIsExpandCard] = useState(false);

    const spendings = useMemo(() =>{
        if (!sort) return spendingsState;

        if (sort === "summaryMoney")
            return [...spendingsState].sort((a,b) => (b.summaryMoney - a.summaryMoney))

        if (sort === "categoryName")
            return[...spendingsState].sort((a,b) => (a.category.localeCompare(b.category)))

    }, [spendingsState, sort])

    return (
        <>
            { !spendings.length?
                <h3>Пока что нет ни одной категории</h3>
                :
                spendings.map((spending) =>{
                    let color = {backgroundColor: spending.color};
                    return (<div
                            onClick={() => setIsExpandCard(!isExpandCard)}
                            key={spending.category}
                            style={color}
                            className={cl.cardSpending + " wrapperPadding"}
                        >
                        <div className={cl.card_main}>
                            <div className={cl.card_properties}>

                                <div className={cl.card_name}>
                                    {spending.category}
                                </div>
                                <div className={cl.card_spentSum}>
                                    {spending.summaryMoney} RUB
                                </div>
                            </div>
                            <div className={cl.card_more}>
                                <span className={cl.circle}></span>
                                <span className={cl.circle}></span>
                                <span className={cl.circle}></span>
                            </div>
                        </div>
                        <CSSTransition in={isExpandCard} timeout={200} classNames="expandList" unmountOnExit>
                            <CardDetail spending={spending}/>
                        </CSSTransition>

                    </div>)
                })
            }
        </>
    );
};

export default Card;