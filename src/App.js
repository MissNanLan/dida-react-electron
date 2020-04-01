import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home'
import './App.css';


function App() {
  return (
    <Router>
    <div >
      <Route path="/" exact component={Home}></Route>
    </div>
  </Router>
  );
}

export default App;
