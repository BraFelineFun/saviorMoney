import React, {ChangeEvent, FC, ReactElement} from 'react';
import SelectItem from "./SelectItem";

export type SelectValueType = string | number;

interface SelectProps {
    title: string,
    value: SelectValueType,
    onChange: ((e: ChangeEvent<HTMLSelectElement>, value: SelectValueType) => void) | ((e: ChangeEvent<HTMLSelectElement>) => void),
    children: ReactElement<typeof SelectItem> | Array<ReactElement<typeof SelectItem>>
}

const Select: FC<SelectProps> = ({title, value, onChange, children}) => {
    return (
        <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, e.target.value as SelectValueType)}
            value={value}
        >
            <option disabled value=""> {title} </option>
            {children}
        </select>
    );
};

export default Select;