import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSearched: false,
      searchWord: "",
      openPrice: "",
      closePrice: "",
      highPrice: "",
      lowPrice: "",
      volume: ""
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {
    const symbol = e.target.querySelector('input[type="text"]').value;
    const timeInterval = document.forms[0].timeInterval.value;
    const apiKey = "X1I0QHQDP5R5GEXA";
    let url;
    if (!timeInterval.includes("min")) {
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + apiKey;
    } else {
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        symbol +
        "&interval=" + timeInterval + "&apikey=" +
        apiKey;
    }

    document.getElementById("stock ticker search").reset();
    console.log(url);
    this.setState({
      searchWord: symbol
    });


    axios
      .get(url).then(response => {
        let last = response["data"]["Meta Data"]["3. Last Refreshed"];
        let stockInfo = response["data"]["Time Series " + "(" + timeInterval + ")"][last];
        this.setState({
          stockSearched: true,
          openPrice: stockInfo["1. open"],
          closePrice: stockInfo["4. close"],
          highPrice: stockInfo["2. high"],
          lowPrice: stockInfo["3. low"],
          volume: stockInfo["5. volume"]
        });
      });
  }

  render() {

    const searchSymbol = (
      <form id="stock ticker search" action="#" onSubmit={this.handleEvent}>
        <div className="SearchBar" align="top">
          <input type="text" placeholder="Search Stock Ticker" />
        </div>
        <div className="TimeInterval" align="bottom">
          <select id="timeInterval">
            <option selected disabled>Choose Time Interval</option>
            <option value="1min">1 minute</option>
            <option value="5min">2 minutes</option>
            <option value="15min">15 minutes</option>
            <option value="30min">30 minutes</option>
            <option value="60min">60 minutes</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <input type="Submit" />
      </form>
    )

    const displayInfo = (
      <div>
        {searchSymbol}
      <h1>{this.state.searchWord}</h1>
      <h1> Open Price: {this.state.openPrice}</h1>
      <h1> Close Price: {this.state.closePrice}</h1>
      <h1> Stock Price: {this.state.lowPrice}</h1>
      <h1> High Price: {this.state.highPrice}</h1>
      <h1> Low Price: {this.state.lowPrice}</h1>
      </div>
    )
    return (
      <div className="App">
      <h1>Stock Platform</h1>
        {this.state.stockSearched ? displayInfo : searchSymbol}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MainPage />, rootElement);
