import React, {useMemo, useState} from 'react';
import cl from "./Pie.module.css"
import PieLabel from "./PieLabel";
import {useSelector} from "react-redux";

const Pie = React.memo(() => {

    const [hoveredValue, setHoveredValue] = useState({category: "", summaryMoney: ""});

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
        //====Structure : ====
        // stroke: #a2c6e0;
        // stroke-dasharray: 11 100;
        // stroke-dashoffset: -8;
        return styles;
    }, [spendings])

    return (
        <div>

            <div className={cl.svg_container}>
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
            </div>
        </div>

    );
});

export default Pie;