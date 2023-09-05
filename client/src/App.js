import { BrowserRouter, Route } from "react-router-dom"
import './App.css';
import Create from './views/FORM/create';
import Detail from './views/DETAIL/Detail';
import Home from './views/HOME/home';
import { Switch } from "react-router-dom/cjs/react-router-dom";

function App() {
  return (
    <BrowserRouter>
      
        <Route exact path="/home" component={Home}/> 
        <Route path="/home/:id" component={Detail}/> 
        <Route path="/create" component={Create}/> 
        
    </BrowserRouter>
  );
}

export default App;

