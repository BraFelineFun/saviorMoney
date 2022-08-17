import React from 'react';

/*
*     Object that expects component show have following structure:
*
*     const selectObject = {title: "select title", options: [
*           {value: "val1", description: "description for val1"},
*           {value: "val2", description: "description for val2"}
*     ]}
*/


const Select = ({selectObject, selected, setSelected}) => {
    return (
        <select
            onChange={(e)=>
                setSelected(e.target.value)}
            value={selected}
        >
            <option disabled value=""> {selectObject.title} </option>

            {selectObject.options.map((option) =>
                <option key={option.value} value={option.value}>
                    {option.description}
                </option>
            )}
        </select>
    );
};

export default Select;