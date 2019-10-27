import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return <div></div>;
  }
  componentDidMount() {
    //checks session and removes if expired
    this.myInterval = setInterval(() => {
      this.setState({
        count: new Date().getTime(),
      });
      if (
        !localStorage.getItem("userRole") &&
        localStorage.getItem("isLogged") == "true"
      ) {
        window.location.reload();
      }
    }, 1000);
  }
}
