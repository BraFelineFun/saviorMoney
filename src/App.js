import './App.css';
import './normalize.css'
import {useState} from "react";
import Pie from "./Components/Pie/Pie";
import FormCategory from "./Components/FormAdd/FormCategory";
import FormSpending from "./Components/FormAdd/FormSpending";

function App() {
    const [spendings, setSpendings] = useState([
        {
            category: "products",
            money: 100,
            color: "#ff3c3c"
        },
        {
            category: "movies",
            money: 340,
            color: "#3cd2ff"
        },
        {
            category: "fastFood",
            money: 180,
            color: "#ff3cbb"
        },
        {
            category: "transport",
            money: 1000,
            color: "#84ff3c"
        }
    ])




    return (
        <div className="App">
            <Pie />

            <FormSpending setSpendings={setSpendings} spendings={spendings}/>

            <hr/>

            <FormCategory />

        </div>
    );
}

export default App;
