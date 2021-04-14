import { CssBaseline } from "@material-ui/core";
import React from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import AuthContextProvider from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AuthContextProvider>
        <Router basename="/Conbi">
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
