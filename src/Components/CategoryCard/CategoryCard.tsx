import React, {FC, useContext} from 'react';
import cl from "../CategoryCards/categoryCards.module.css";
import cashNumberToString from "../../Helpers/cashNumberToString";
import MoreButton from "../UI Components/MoreButton/MoreButton";
import CardDetail from "../CategoryCardDetail/CategoryCardDetail";
import {removeCategory} from "../../Store/Slices/SpendingsSlice";
import ICategory from "../../Models/ICategory";
import useAppDispatch from "../../Hooks/useAppDispatch";
import {EditCategoryContext, ICategoryContextValueType} from "../Category/Category";
import useToggle from "../../Hooks/useToggle";
import MenuItem from "../UI Components/MenuItem/MenuItem";
import MenuList from "../UI Components/MenuList/MenuList";
const editImg = require("../../Resources/img/edit.png");
const deleteImg = require("../../Resources/img/delete.png");

interface CategoryCardProps {
    spending: ICategory;
}

const CategoryCard: FC<CategoryCardProps> = ({spending}) => {
    let color = {backgroundColor: spending.color};
    const [isExpanded, toggleIsExpanded] = useToggle(false);
    const dispatch = useAppDispatch();
    const [_, editCategory] = useContext<ICategoryContextValueType>(EditCategoryContext) ?? [null, null];

    function removeCategoryCallback(): void {
        dispatch(removeCategory({category: spending.category}))
    }

    function editCategoryCallback(): void {
        if (editCategory) {
            editCategory(spending);
        } else {
            console.error('UNEXPECTED NULL CONTEXT');
        }
    }


    return (
        <div
            key={spending.category}
            style={color}
            className={cl.cardSpending + " wrapperPadding"}
        >
            <div className={cl.card_main}>
                <div
                    onClick={toggleIsExpanded}
                    className={isExpanded ?
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
                    <MoreButton>
                        <MenuList>
                            <MenuItem onClick={editCategoryCallback} image={editImg} alt='edit category'>
                                Редактировать
                            </MenuItem>
                            <MenuItem onClick={removeCategoryCallback} image={deleteImg} alt='delete category'>
                                Удалить
                            </MenuItem>
                        </MenuList>
                    </MoreButton>
                </div>
            </div>
            <CardDetail
                isExpandCard={isExpanded}
                spending={spending}
            />
        </div>
    )
};

export default CategoryCard;