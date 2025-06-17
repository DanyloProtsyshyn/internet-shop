import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Catalog from './components/Catalog';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/catalog" component={Catalog} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
