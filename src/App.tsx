import cl from './App.module.css';
import './normalize.css';
import Category from "./Components/Category/Category";
import PieContainer from "./Components/Pie/PieContainer";

function App() {


    return (
        <div className={cl.App}>
            <div className={cl.container}>
                <Category/>
            </div>

            <div className={cl.container}>
                <PieContainer/>
            </div>
        </div>
    );
}

export default App;
