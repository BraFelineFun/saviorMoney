import React, {FC, useContext, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import cl from "./card.module.css"
import CardDetail from "./CardDetail/CardDetail";
import MoreButton from "../UI Components/MoreButton/MoreButton";
import {removeCategory} from "../../Store/Slices/SpendingsSlice";
import cashNumberToString from "../../Helpers/cashNumberToString";
import Empty from "../UI Components/Empty/Empty";
import {EditCategoryContext} from "../Category/Category";
import sortByField from "../../Helpers/sortByField";
import useAppSelector from "../../Hooks/useAppSelector";
import ICategory from "../../Models/ICategory";
import useAppDispatch from "../../Hooks/useAppDispatch";
interface CardProps {
    sortField: string;
}
const Card: FC<CardProps> = ({sortField}) => {

    const spendingsState = useAppSelector(state => state.spendings);
    const [expandCardCategory, setExpandCardCategory] = useState<ICategory[]>([]);
    const dispatch = useAppDispatch();

    const spendings = useMemo(() =>
            sortByField(sortField, spendingsState)
        , [spendingsState, sortField]);

    const [_, editCategory] = useContext(EditCategoryContext) ?? [null, null];

    function expandCardSetter(category: ICategory) {
        if (!expandCardCategory.includes(category))
            setExpandCardCategory([...expandCardCategory, category]);
        else
            setExpandCardCategory((prev) =>
                prev.filter((thisCategory) => category !== thisCategory
                ))
    }

    function removeCategoryContext(category: string): () => void {
        return function () {
            dispatch(removeCategory({category}))
        }
    }

    function toEditCategoryContext(spending: ICategory): () => void {

        return function () {
            if (editCategory) {
                editCategory(spending);
            }
            else {
                console.error('UNEXPECTED NULL CONTEXT');
            }
        }
    }

    return (
        <>
            {!spendings.length ?
                <div className={cl.empty}>
                    <Empty emptyText={"Пока что нет ни одной категории"}/>
                </div>

                :
                spendings.map((spending) => {

                    let isIncluded = expandCardCategory.includes(spending.category);
                    let color = {backgroundColor: spending.color};

                    return (
                        <div
                            onClick={() => expandCardSetter(spending.category)}
                            key={spending.category}
                            style={color}
                            className={cl.cardSpending + " wrapperPadding"}
                        >
                            <div className={cl.card_main}>
                                <div
                                    className={isIncluded ?
                                        [cl.card_properties, cl.expendedCard].join(" ") :
                                        cl.card_properties}
                                >

                                    <div className={cl.card_name}>
                                        {spending.category}
                                    </div>
                                    <div className={cl.card_spentSum}>
                                        <b>
                                            <div className="">RUB</div>
                                            <div
                                                className="moneyDisplay">{cashNumberToString(spending.summaryMoney)}</div>
                                        </b>

                                    </div>
                                </div>
                                <div className={cl.card_more}>
                                    <MoreButton
                                        editCallback={toEditCategoryContext(spending)}
                                        removeCallback={removeCategoryContext(spending.category)}
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

export default React.memo(Card);