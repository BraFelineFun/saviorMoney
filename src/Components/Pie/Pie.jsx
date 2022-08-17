import React, {useMemo, useState} from 'react';
import cl from "./Pie.module.css"
import PieLabel from "./PieLabel";
import {useSelector} from "react-redux";
import Empty from "../UI Components/Empty/Empty";
import useToggle from "../../Hooks/useToggle";
import ExpensesList from "../ExpensesList/ExpensesList";

const Pie = React.memo(() => {

    const [hoveredValue, setHoveredValue] = useState({category: "", summaryMoney: ""});
    const [isShowForm, toggleForm] = useToggle(false);
    //TODO Доработать добавление и кнопку

    const spendings = useSelector(state => state.spendings);

    const styles = useMemo(() => {
        let length = spendings.length;
        const styles = [];
        if (length){

            const sum = spendings.reduce((sum, {summaryMoney}) => sum + summaryMoney, 0)

            let prevSpentPercent = 0;
            for(let i = 0; i < length; i++){
                let spentPercent = spendings[i].summaryMoney/sum* 100;

                let style = {
                    stroke: `${spendings[i].color}`,
                    strokeDasharray: `${spentPercent} 100`,
                    strokeDashoffset: `-${prevSpentPercent}`
                }
                styles.push(style);
                prevSpentPercent += spentPercent;
            }
        }
        //==== Structure: ====
        // stroke: #a2c6e0;
        // stroke-dasharray: 11 100;
        // stroke-dashoffset: -8;
        return styles;
    }, [spendings])

    const hasExpenses = useMemo(() => {
        let hasExpensesCheck = false;
        spendings.forEach((spending) =>{
            spending.expenses.forEach((expense) =>{
                if (expense.money > 0) hasExpensesCheck = true;
            })
        })
        return hasExpensesCheck;

    }, [spendings])

    function drawEmpty(){
        if (!spendings.length)
            return (
                <Empty emptyText={"Пока что ни одной категории"}/>
            )

        if (!hasExpenses)
            return (
                <Empty emptyText={"Пока что ни одной траты в категориях"}/>
            )
        return false;
    }

    return (
        <>
            <div className={cl.svg_container}>
                { drawEmpty() ||        //Drawing or empty Component or Pie
                    <>
                        <PieLabel hoveredValue={hoveredValue}/>
                        <svg
                            className={cl.chart}
                            viewBox="0 0 39 39"
                        >
                            {
                                spendings.map((spending, index) =>
                                    <circle
                                        key={spending.category}
                                        style={styles[index]}
                                        className={cl.unit}
                                        r="15.9"
                                        cx="50%"
                                        cy="50%"
                                        onMouseEnter={() => setHoveredValue(spending)}
                                        onMouseLeave={() => setHoveredValue({category: "", summaryMoney: ""})}
                                    >
                                    </circle>
                                )}
                        </svg>
                    </>
                }
            </div>
        </>
    );
});

export default Pie;