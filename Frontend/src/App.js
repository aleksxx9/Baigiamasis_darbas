import React from "react";
import "./App.css";
import Nav from "./Components/Navbar";
import Login from "./Components/Login";
import Config from "./config.js";
import Timer from "./Components/timer";
import Registration from "./Components/Registration";
import mainPage from "./Components/mainPage";
import formCreate from "./Components/formCreate";
import startingPage from "./Components/startPage";
import formFilling from "./Components/formFilling";
import hiringAccept from "./Components/hiringAccept";
import hiring from "./Components/hiring";
import archiveNames from "./Components/archiveNames";
import Archive from "./Components/archive";
import Delete from "./Components/delete";
import ChangePassword from "./Components/ChangePassword";
import startPage2 from "./Components/startPage2";
import formShare from "./Components/formShare";
import deleteUser from "./Components/deleteUser";
import Statistics from "./Components/Statistics";
import Prolong from "./Components/Prolong";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const refreshToken = async () => {
  const url = localStorage.getItem("refreshToken");
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("jwt"),
      },
      method: "GET",
    });
    const data = await response.text();
    localStorage.setItem("jwt", data);
    const url2 = localStorage.getItem("userInfo");
    const response2 = await fetch(url2, {
      headers: { "Content-Type": "application/json" },
      method: "get",
      headers: {
        auth: localStorage.getItem("jwt"),
      },
    });
    const data2 = await response2.json();
    localStorage.setItem("expiration", data2.exp);
  } catch (e) { }
  if (
    localStorage.getItem("jwt") == "Invalid token" ||
    localStorage.getItem("jwt") == "Access denied"
  )
    localStorage.removeItem("userRole");
};

const checkAuth = () => {
  //checks session and returns status
  const exp = localStorage.getItem("userRole");
  if (!exp) {
    return false;
  }
  if (exp == "Admin" || exp == "Super Admin") {
    refreshToken();
    return true;
  }
  return false;
};

const checkAuth2 = () => {
  //checks session and returns status
  const exp = localStorage.getItem("userRole");
  if (!exp) {
    return false;
  }
  if (exp) {
    refreshToken();
    return true;
  }
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  //On path change/reload/refresh gets passed status and redirects to login page, otherwise in selected one
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
    }
  />
);

const PrivateRoute2 = ({ component: Component, ...rest }) => (
  //On path change/reload/refresh gets passed status and redirects to login page, otherwise in selected one
  <Route
    {...rest}
    render={props =>
      checkAuth2() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
    }
  />
);

class App extends React.Component {
  render() {
    return (
      <div>
        <Timer />
        <Config />
        <Router>
          <Route path="/" component={Nav} />
          <Switch>
            <Route path="/" exact component={startingPage} />
            <PrivateRoute path="/delete" exact component={Delete} />
            <Route path="/login" exact component={Login} />
            <Route path="/formFilling" component={formFilling} />
            <PrivateRoute path="/deleteUser" component={deleteUser} />
            <PrivateRoute2 path="/changePassword" component={ChangePassword} />
            <PrivateRoute2 path="/Prolong" component={Prolong} />
            <PrivateRoute2 path="/Statistics" component={Statistics} />
            <PrivateRoute2 path="/startPage2" component={startPage2} />
            <PrivateRoute path="/archiveNames" component={archiveNames} />
            <PrivateRoute path="/formShare" component={formShare} />
            <PrivateRoute path="/mainPage" component={mainPage} />
            <PrivateRoute path="/archive" component={Archive} />
            <PrivateRoute path="/hiring" component={hiring} />
            <PrivateRoute path="/hiringaccept" component={hiringAccept} />
            <PrivateRoute path="/formCreate" component={formCreate} />
            <PrivateRoute path="/registration" component={Registration} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
