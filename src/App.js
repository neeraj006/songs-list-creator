import React, { Component } from 'react'
import { songListCreator } from "./songListCreator";
import "./App.css";


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      combinedList: []
    }
    this.inputRef = React.createRef();
  }

  inputHandler = (event) => {
    event.preventDefault();
    const input = this.inputRef.current.value;
    this.parseInput(input);
  }

  parseInput = (input) => {
    const userSongList = [];
    let i = 0;
    while (input[i]) {
      let j = i;
      while (input[i] && input[i] !== ',') {
        i++;
      }
      if (input[i] === ',') {
        userSongList.push(parseInt(input.slice(j, i), 10));
        i++;
      }
      else {
        userSongList.push(parseInt(input.slice(j, i), 10));
        break
      }
    }

    this.state.combinedList.push(userSongList);
    this.setState({ ...this.state.combinedList });
  }

  renderUserWithSongs = () => {
    return this.state.combinedList.map(songArray =>
      <h2>{songArray.forEach(item => item)}</h2>)
  }

  createList = () => {
    return songListCreator(this.state.combinedList).getSongsList();
  }

  render() {
    return (
      <div className="App">
        <h1> Song List Creator</h1>
        <h3> Enter songId of songs for one user separated by commas and press submit</h3>
        <form onSubmit={event => this.inputHandler(event)}>
          <input type="text" ref={this.inputRef}></input>
          <input type="submit"></input>
        </form>
        <div className="input-songs-container">
          {this.state.combinedList.map((songArray, index) =>
            <h2 key={index}>{`User${index + 1} - `}{songArray.map(songId => `${songId}, `)}</h2>)}
        </div>
        <div className="result-container">
          <h1>Result -  {this.createList().map(songId => `${songId}, `)}</h1>
        </div>
      </div>
    )
  }
}
