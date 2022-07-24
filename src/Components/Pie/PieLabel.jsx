import React from 'react';
import cl from "./Pie.module.css";

const PieLabel = ({hoveredValue}) => {
    return (
        <div className={cl.labelPlaceholder}>
            <div className={cl.label}>
                <label>{hoveredValue.category}</label>
                <label>{hoveredValue.summaryMoney} {hoveredValue.summaryMoney && "RUB"}</label>
            </div>
        </div>
    );
};

export default PieLabel;