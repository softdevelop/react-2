import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ResultsProvider, ResultsTable, ResultModal, ResultForm, Findings } from './modules/results';

import './Root.scss';

function Root() {
  return (
    <div className="root-app">
      <ResultsProvider>
        <Router>
            <Switch>
              <Route exact path="/results">
                <ResultsTable />
              </Route>
              <Route exact path="/results/view/:id">
                <Findings />
              </Route>
              <Route exact path="/results/:id">
                <ResultForm />
              </Route>
              <Route exact path="/">
                <ResultForm />
              </Route>
            </Switch>
        </Router>
      </ResultsProvider>
    </div>
  )
}

export default Root;
