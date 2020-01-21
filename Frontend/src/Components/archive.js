import React, { Component, createRef } from "react";
import "./archive.css";

export default class Arcihve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      hired: [],
    };
  }

  fillData(data) {
    this.setState({ data: data });
  }

  async getForm() {
    try {
      const response = await fetch(localStorage.getItem("hiredGet"), {
        headers: {
          "Content-Type": "application/json",
          name: localStorage.getItem("getArchiveByName"),
        },
        method: "GET",
      });
      const data = await response.json();
      if (!data) {
        this.props.history.push("/mainPage");
      }
      if (!data[0]) this.props.history.push("./mainPage");
      this.setState({ name: data[0].name });
      this.fillData(data);
    } catch (e) {
      this.setState({ error: e });
    }
  }

  componentDidMount() {
    this.getForm();
  }

  render() {
    let data = "";
    let data2 = "";
    return (
      <div>
        {this.state.data ? (
          <div>
            {this.state.data.map(elem => {
              elem.data=elem.data.replace(/::/g, ':');
              data =
                data +
                "<div class='accordion' style='background-color:rgb(52, 58, 64); cursor:default'></div><div class='panel '>" +
                elem.data +
                "</div></br>";
              data2 += data;
              document.getElementById("form").innerHTML = data2 + "</div>";
              data = "";
            })}
          </div>
        ) : (
            <div />
          )}
        <br />
        <div className=" d-flex  justify-content-center">
          <h1 id="Name">{this.state.name}</h1>
        </div>
        <br />
        <div className="col-12 d-flex justify-content-center">
          <div id="form" className=" col-6 " />
        </div>
      </div>
    );
  }
}
