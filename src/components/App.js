import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import logo from './../logo.svg';
import Home from './Home';
import Footer from './footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To-Do App</h1>
          <div className="text-muted">Designed and developed by Silam Pawar
        <a href="https://github.com/silampawar" target="_blank">(Github)</a>.
        </div>
        </header>
        <main>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
