import logo from './logo.svg';
// import './App.css';
import { connect, useDispatch } from "react-redux"
import {
  increaseCounter,
  decreaseCounter,
} from "./action/actions"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import UserList from './components/User Management/TableUser';
import ProductList from './components/Product Management/TableProduct';
import NewProduct from './components/Product Management/NewProduct';


function App(props) {
  const dispatch = useDispatch();

  return (
    <Router>
      <Home />
      <Switch>
        <Route path="/products/manage-product">
          <ProductList />
        </Route>
        <Route path="/products/new-product">
          <NewProduct />
        </Route>
        <Route path="/user/manage-user">
          <UserList />
        </Route>
      </Switch>
    </Router>
  );
}



export default App
