import React, {FC} from 'react';
import SwitchComponents from "../UI Components/SwitchComponents/SwitchComponents";
import Pie from "./Pie";
import FormSpending from "../FormAdd/FormSpending";
import useToggle from "../../Hooks/useToggle";
import Header from "../UI Components/Header/Header";
import cl from './Pie.module.css'
import ExpensesList from "../ExpensesList/ExpensesList";
import SwitchHeader from "../UI Components/SwitchComponents/SwitchHeader";

const PieContainer: FC = () => {

    const [isToggled, toggle] = useToggle(false);

    return (
        <div>
            <Header title={"Главная"}></Header>
            <main className={cl.main_container}>
                <div className="wrapperPadding">
                    <SwitchComponents
                        switchKey={isToggled}
                        SwitchComponent={<Pie/>}
                        SwitchedComponent={<FormSpending/>}
                    >
                        <SwitchHeader
                            isSwitched={isToggled}
                            onSwitch={toggle}
                        >
                            Добавить трату
                        </SwitchHeader>
                    </SwitchComponents>
                </div>
                {!isToggled && <ExpensesList/>}
            </main>
        </div>
    );
};

export default PieContainer;