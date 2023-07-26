import React, {FC} from 'react';
import {SelectValueType} from "./Select";

interface SelectItemProps {
    children: string;
    value: SelectValueType;
}

const SelectItem: FC<SelectItemProps> = ({value, children}) => {
    return (
        <option key={value} value={value}>
            {children}
        </option>
    );
};

export default SelectItem;