import {ChangeEvent, FC, useState} from 'react';
import {addExpense} from "../../Store/Slices/SpendingsSlice";
import cl from './formCategory.module.css'
import Collapse from "../UI Components/Collapse/Collapse";
import useAppDispatch from "../../Hooks/useAppDispatch";
import useAppSelector from "../../Hooks/useAppSelector";


const FormSpending: FC = () => {

    const [spentSum, setSpentSum] = useState<number>(0);
    const [chosenCategory, setChosenCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const spendings = useAppSelector(state => state.spendings)
    const dispatch = useAppDispatch();

    function checkNumberInput(value: string): void {
        if ((/\d*/g).test(value)) {
            setSpentSum(Number(value));
        }
    }

    function addSpendings(): void {
        if (chosenCategory === "") {
            alert("Выберете категорию");
            return;
        }
        if (spentSum <= 0) {
            alert("Введите сумму больше нуля")
            return;
        }
        if (description === ""){
            alert("Введите описание");
            return;
        }

        const spentSumNum = Number(spentSum);
        dispatch(addExpense({money: spentSumNum, date: '', category: chosenCategory, description}))

    }


    return (
        <div className={cl.form + " wrapperPadding"}>
            <Collapse title='Категории:'>
                <div className={cl.categoryListContent}>
                    {
                        spendings.map(({category}) =>
                            //TODO: добавить маркер цвета
                            <div
                                className={category === chosenCategory?
                                    [cl.categoryItem, cl.__chosenCategory].join(" ")
                                    : cl.categoryItem}
                                onClick={() => setChosenCategory(category)}
                                key={category}
                            >
                                {category}
                            </div>
                        )
                    }
                </div>
            </Collapse>

            <div className={cl.inputField}>
                <label htmlFor="spentSum">Введите сумму:</label>
                <input
                    id="spentSum"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => checkNumberInput(e.target.value)}
                    value={spentSum}
                    type="number"
                />
            </div>
            <div className={cl.inputField}>
                <label htmlFor="description">Введите описание:</label>
                <input
                    id="description"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    value={description}
                    type="text"/>
            </div>
            <button onClick={ addSpendings }>
                Добавить
            </button>
        </div>
    );
};

export default FormSpending;