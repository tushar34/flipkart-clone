import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Productdetail from './component/Productdetail';
// import {} from "react-router-dom"
import Addtocart from './component/Addtocart';
import Header from './component/Header';
import Checkout from './component/Checkout';
import history from './history';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Router history={history}>
        <Header history={history} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route  path='/productdetail' component={Productdetail} />
          <Route  path='/addtocart' component={Addtocart} />
          <Route  path='/checkout' component={Checkout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
