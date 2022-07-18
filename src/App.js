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
import NewUser from './components/User Management/NewUser';
import ProductList from './components/Product Management/TableProduct';
import NewProduct from './components/Product Management/NewProduct';
import DetailProduct from './components/Product Management/DetailProduct';
import DetailUser from './components/User Management/DetailUser';


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
        <Route
          exact
          path="/products/product-detail/:id"
          render={({ match }) => (
            <DetailProduct />
          )}
        />
        <Route path="/user/manage-user">
          <UserList />
        </Route>
        <Route path="/user/new-user">
          <NewUser />
        </Route>
        <Route
          exact
          path="/user/user-detail/:id"
          render={({ match }) => (
            <DetailUser />
          )}
        />
      </Switch>
    </Router>
  );
}



export default App
