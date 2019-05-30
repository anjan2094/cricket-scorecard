import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Sidebar} exact/>
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
