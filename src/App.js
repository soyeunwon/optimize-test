import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ListPage from "./feature/blog/pages/ListPage";
import ViewPage from "./feature/blog/pages/ViewPage/index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <h1>optimize test</h1>
        </Route>
        <Route path="/blog" component={ListPage} exact />
        <Route path="/blog/view/:id" component={ViewPage} exact />
      </Switch>
    </div>
  );
}

export default App;
