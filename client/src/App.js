import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import DoubtItem from './components/DoubtItem/DoubtItem';
import Notfound from './components/Notfound/Notfound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/doubt/:doubt_id" component={DoubtItem}/>
        <Route component={Notfound}/>
      </Switch>
    </Router>
  );
}

export default App;
