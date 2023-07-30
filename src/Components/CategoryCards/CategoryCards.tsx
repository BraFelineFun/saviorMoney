import React, {FC, useMemo} from 'react';
import cl from "./categoryCards.module.css"
import Empty from "../UI Components/Empty/Empty";
import sortByField from "../../Helpers/sortByField";
import useAppSelector from "../../Hooks/useAppSelector";
import CategoryCard from "../CategoryCard/CategoryCard";

interface CardProps {
    sortField: string;
}

const CategoryCards: FC<CardProps> = ({sortField}) => {

    const spendingsState = useAppSelector(state => state.spendings);

    const spendings = useMemo(() =>
        sortByField(sortField, spendingsState)
    , [spendingsState, sortField]);

    return (
        <>
            {!spendings.length ?
                <div className={cl.empty}>
                    <Empty emptyText={"Пока что нет ни одной категории"}/>
                </div>

                :
                spendings.map((spending) => (
                    <CategoryCard key={spending.name} spending={spending}/>
                ))
            }
        </>
    );
};

export default React.memo(CategoryCards);