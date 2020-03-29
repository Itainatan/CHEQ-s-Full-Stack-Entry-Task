import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import VastXml from "./components/VastXml";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/xml/:id" component={VastXml} />
            </Switch>
        </Router>
    );
};

