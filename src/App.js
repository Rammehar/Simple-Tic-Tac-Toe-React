import React, { Component } from "react";
import "./App.css";
import Board from "./Board";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(9).fill(null),
      player: "X",
      winner: null,
      winningCombo: null
    };
  }

  resetGame() {
    if (this.state.winningCombo) {
      for (let i = 0; i < this.state.winningCombo.length; i++) {
        document.getElementById(
          `box${this.state.winningCombo[i]}`
        ).style.backgroundColor = "";
      }
    }

    this.setState({
      board: Array(9).fill(null),
      player: "X",
      winner: null,
      winningCombo: null
    });
  }

  handleClick(index) {
    let newBoard = this.state.board;
    if (!this.state.winner) {
      if (this.state.board[index] == null) {
        newBoard[index] = this.state.player;
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "O" : "X"
        });
        this.setWinner();
      }
    }
    this.showWinner();
  }

  emptyBoxes() {
    return this.state.board.filter(function(element) {
      return element == null;
    });
  }
  setWinner() {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];
    for (let i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];
      let board = this.state.board;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({
          winner: this.state.player,
          winningCombo: winningCombination[i]
        });
      }
    }
  }
  showWinner() {
    if (this.state.winner) {
      for (let i = 0; i < this.state.winningCombo.length; i++) {
        document.getElementById(
          `box${this.state.winningCombo[i]}`
        ).style.backgroundColor = "red";
      }

      return <h2>Winner is {this.state.winner}</h2>;
    } else if (this.emptyBoxes().length === 0) {
      return <h2>Match is Tie</h2>;
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Tic Tac Toe Board</h2>
        <button onClick={()=>this.resetGame()}>Reset</button>
        <hr/>
        {this.showWinner()}
        <div className="board">
          <Board
            resetGame={() => this.resetGame()}
            boxClick={index => {
              this.handleClick(index);
            }}
            board={this.state.board}
          />
        </div>
      </div>
    );
  }
}
export default App;
