import React from 'react';
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";
import Pie from "./Pie";
import FormSpending from "../FormAdd/FormSpending";
import useToggle from "../../Hooks/useToggle";
import Header from "../UI Components/Header/Header";

const PieContainer = () => {

    const [isToggled, toggle] = useToggle(false);

    return (
        <div>
            <Header title={"Главная"}></Header>
            <main className="wrapperPadding">
                <SwitchComponents
                    switchTitle={"Добавить трату"}
                    switchKey={isToggled}
                    setSwitchKey={toggle}
                    SwitchComponent={<Pie/>}
                    SwitchedComponent={<FormSpending/>}
                />
            </main>
        </div>
    );
};

export default PieContainer;