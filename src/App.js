import './App.css';
import './normalize.css'
import Pie from "./Components/Pie/Pie";
import FormSpending from "./Components/FormAdd/FormSpending";
import Category from "./Components/Category/Category";
import PieContainer from "./Components/Pie/PieContainer";

function App() {


    return (
        <div className="App">
            <div className="container">
                <Category/>
            </div>

            <div className="container">
                <PieContainer />
            </div>

            {/*<div className="container">*/}
            {/*    <FormSpending/>*/}
            {/*</div>*/}



        </div>
    );
}

export default App;
