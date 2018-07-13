import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "asdf",
      openPrice: "",
      closePrice: "",
      highPrice: "",
      lowPrice: ""
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {
    const symbol = e.target.querySelector('input[type="text"]').value;
    const apiKey = "X1I0QHQDP5R5GEXA";

    this.setState({
      searchWord: symbol
    });
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
          symbol +
          "&interval=1min&apikey=" +
          apiKey
      )
      .then(response => {
        let last = response["data"]["Meta Data"]["3. Last Refreshed"];
        let stockInfo = response["data"]["Time Series (1min)"][last];
        this.setState({
          openPrice: stockInfo["1. open"]
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Stock Platform: {this.state.searchWord}</h1>
        <form action="#" onSubmit={this.handleEvent}>
          <input type="text" placeholder="Search Symbol" />
          <input type="Submit" />
          <h1>{this.state.openPrice}</h1>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MainPage />, rootElement);
