import React, {useMemo, useState} from 'react';
import cl from "./Pie.module.css"
import PieLabel from "./PieLabel";

const Pie = React.memo(({spendings}) => {

    const [hoveredValue, setHoveredValue] = useState({category: "", money: ""});



    const styles = useMemo(() => {
        let length = spendings.length;
        const styles = [];
        if (length){

            const sum = spendings.reduce((sum, {money}) => sum + money, 0)

            let prevSpentPercent = 0;
            for(let i = 0; i < length; i++){

                let spentPercent = spendings[i].money/sum* 100;

                let style = {
                    stroke: `${spendings[i].color}`,
                    strokeDasharray: `${spentPercent} 100`,
                    strokeDashoffset: `-${prevSpentPercent}`
                }
                styles.push(style);
                prevSpentPercent += spentPercent;
            }
        }
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
                                onMouseLeave={() => setHoveredValue({category: "", money: ""})}
                            >
                            </circle>
                        )}
                </svg>
            </div>
        </div>

    );
});

export default Pie;