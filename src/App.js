import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import StatisticsPage from "./feature/statistics/pages/StatisticsPage";
import "./App.css";

const ListPage = lazy(() => import("./feature/blog/pages/ListPage"));
const ViewPage = lazy(() => import("./feature/blog/pages/ViewPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>로딩 중...</div>}>
        <Switch>
          <Route path="/" component={StatisticsPage} exact />
          <Route path="/blog" component={ListPage} exact />
          <Route path="/blog/view/:id" component={ViewPage} exact />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
