import React from 'react';

import { useAsync } from 'react-async';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ToolBar } from './components/ToolBar';
import { World } from './components/world';
import { Countries } from './components/countries';
import { Country } from './components/countries/Country';

import { Summary } from './types';

import './styles.css';

async function loadData(): Promise<Summary> {
  const res = await fetch("https://api.covid19api.com/summary");

  if (!res.ok) throw new Error(res.statusText);

  return await res.json();
}

function App() {
  const { data, error, isPending } = useAsync({ promiseFn: loadData });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  if (data) {
    return (
      <Router>
        <div>
          <ToolBar></ToolBar>
        </div>

        <Switch>
          <Route exact path="/countries">
            <Countries data={data}></Countries>
          </Route>
          <Route exact path="/">
            <World data={data}></World>
          </Route>
          <Route path="/countries/:slug" component={Country}></Route>
        </Switch>
      </Router>
    );
  }

  return <></>;
}

export default App;