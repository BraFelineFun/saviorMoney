import React, {useMemo, useState} from 'react';
import cl from "./Pie.module.css"
import PieLabel from "./PieLabel";
import Empty from "../UI Components/Empty/Empty";
import useAppSelector from "../../Hooks/useAppSelector";
import ICategory from "../../Models/ICategory";

interface IPieSvgStyle {
    stroke: string;
    strokeDasharray: string;
    strokeDashoffset: string;
}


const Pie = () => {

    const [hoveredValue, setHoveredValue] = useState<ICategory | null>(null);
    const spendings = useAppSelector(state => state.spendings);

    const styles = useMemo(() => {
        let length = spendings.length;
        const styles: IPieSvgStyle[] = [];
        if (length) {

            const sum = spendings.reduce((sum, {summaryMoney}) => sum + summaryMoney, 0)

            let prevSpentPercent = 0;
            for (let i = 0; i < length; i++) {
                let spentPercent = spendings[i].summaryMoney / sum * 100;

                let style: IPieSvgStyle = {
                    stroke: `${spendings[i].color}`,
                    strokeDasharray: `${spentPercent} 100`,
                    strokeDashoffset: `-${prevSpentPercent}`
                }
                styles.push(style);
                prevSpentPercent += spentPercent;
            }
        }
        return styles;
    }, [spendings])

    const hasExpenses = useMemo(() => {
        let hasExpensesCheck = false;
        spendings.forEach((spending) => {
            spending.expenses.forEach((expense) => {
                if (expense.money > 0) hasExpensesCheck = true;
            })
        })
        return hasExpensesCheck;

    }, [spendings])

    function drawEmpty() {
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
        <div className={cl.svg_container}>
            {drawEmpty() ||        //Drawing or empty Component or Pie
                <>
                    <PieLabel category={hoveredValue?.name} summaryMoney={hoveredValue?.summaryMoney}/>
                    <svg
                        className={cl.chart}
                        viewBox="0 0 39 39"
                    >
                        {
                            spendings.map((spending: ICategory, index: number) =>
                                <circle
                                    key={spending.name}
                                    style={styles[index]}
                                    className={cl.unit}
                                    r="15.9"
                                    cx="50%"
                                    cy="50%"
                                    onMouseEnter={() => setHoveredValue(spending)}
                                    onMouseLeave={() => setHoveredValue(null)}
                                >
                                </circle>
                            )}
                    </svg>
                </>
            }
        </div>
    );
};

export default React.memo(Pie);