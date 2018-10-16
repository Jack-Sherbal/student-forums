import React, { Component } from "react";

class Rating extends Component {
  state = {
    score: 0,
    vote: "",
    upColor: "secondary",
    downColor: "secondary"
  };

  handleVote = event => {
    console.log(event);
    if (!this.state.vote) {
      const newScore = this.calcScore(event, 0);
      this.setBtnColor(event);
      this.setState({
        vote: event.target.value,
        score: newScore
      });
    } else if (event.target.value !== this.state.vote) {
      const newScore = this.calcScore(event, 1);
      this.setBtnColor(event);
      this.setState({
        score: newScore
      });
    } else if (event.target.value === this.state.vote) {
      this.setState({
        score: 0,
        vote: "",
        upColor: "secondary",
        downColor: "secondary"
      });
    }
  };

  setBtnColor(event) {
    if (event.target.value === "up") {
      this.setState({
        upColor: "success",
        downColor: "secondary",
        vote: "up"
      });
    } else {
      this.setState({
        upColor: "secondary",
        downColor: "danger",
        vote: "down"
      });
    }
  }

  calcScore(event, shift) {
    return event.target.value === "up"
      ? this.state.score + 1 + shift
      : this.state.score - (1 + shift);
  }

  render() {
    console.log("render");
    const { score } = this.state;
    const btnClasses = "btn btn-sm mt-2 mb-2 btn-";

    return (
      <div className="btn-group">
        <button
          onClick={this.handleVote}
          value="up"
          className={btnClasses + this.state.upColor}
        >
          ▲
        </button>
        <badge className="badge badge-primary pr-3 pl-3 p-2 mt-2 mb-2 rounded-0">
          <h5 className="m-0">{score}</h5>
        </badge>
        <button
          onClick={this.handleVote}
          value="down"
          className={btnClasses + this.state.downColor}
        >
          ▼
        </button>
      </div>
    );
  }
}

export default Rating;
