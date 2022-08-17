import React from 'react';
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";
import Pie from "./Pie";
import FormSpending from "../FormAdd/FormSpending";
import useToggle from "../../Hooks/useToggle";
import Header from "../UI Components/Header/Header";
import cl from './Pie.module.css'

const PieContainer = () => {

    const [isToggled, toggle] = useToggle(false);

    return (
        <div>
            <Header title={"Главная"}>
                {/*//TODO: сортировка по дате?*/}
            </Header>
            <main className={cl.main_container}>
                <div className="wrapperPadding">
                    <SwitchComponents
                        switchTitle={"Добавить трату"}
                        switchKey={isToggled}
                        setSwitchKey={toggle}
                        SwitchComponent={<Pie/>}
                        SwitchedComponent={<FormSpending/>}
                    />
                </div>
            </main>
        </div>
    );
};

export default PieContainer;