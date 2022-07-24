import React, {useMemo} from 'react';
import {useSelector} from "react-redux";

const Card = ({sort}) => {

    const spendingsState = useSelector(state => state.spendings)

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
                    return (<div key={spending.category} style={color} className="cardSpending wrapperPadding">
                        <div className="card_properties">

                            {/*df*/}
                            <div className="card_name">
                                {spending.category}
                            </div>
                            <div className="card_spentSum">
                                {spending.summaryMoney} RUB
                            </div>
                        </div>
                        <div className="card_more">
                            <span className="circle"></span>
                            <span className="circle"></span>
                            <span className="circle"></span>
                        </div>
                    </div>)
                })
            }
        </>
    );
};

export default Card;