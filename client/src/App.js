import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';
import SpotifyDisplay from './SpotifyComponents/spotify-display';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar className="App-header" />
        </header>
        <SpotifyDisplay />
      </div>
    );
  }
}

export default App;
