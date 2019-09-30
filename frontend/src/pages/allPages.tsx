import React, { Fragment } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import NoSSR from "react-no-ssr";

import { UsersTable } from "./usersTable";
import { LoginPage } from "./login";
import { MePage } from "./me";
import { Home } from "./home";
import { UsersAnalytics } from "./usersAnalytics";

export default function Pages() {
  return (
    <Fragment>
      <NoSSR>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/usersTable" component={UsersTable} />
            <Route exact path="/usersAnalytics" component={UsersAnalytics} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/me" component={MePage} />
          </div>
        </Router>
      </NoSSR>
    </Fragment>
  );
}
