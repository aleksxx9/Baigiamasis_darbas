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

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;

    s.innerHTML =
      'function sendData(id) {let data = document.getElementById(id);  sendData1(data)  }  async function sendData1(hired) {var id = hired.id;  const name1 = $(document.getElementById("Name")).prop("innerHTML");  var str = $(hired).prop("outerHTML"); let newMessage = str.replace(/"/g, "\'"); newMessage = JSON.stringify(newMessage);try {const response = await fetch("' +
      localStorage.getItem("hireSend") +
      "\", {headers: { 'Content-Type': 'application/json' },method: 'POST', body: JSON.stringify({name: " +
      "name1" +
      ', data: newMessage,}),});  try {const response = await fetch("' +
      localStorage.getItem("hireSendDelete") +
      "\", {headers: {'Content-Type':'application/json', name:" +
      "id" +
      ",},method: 'DELETE',}); window.location.reload()} catch (e) {console.log(e);}} catch (e) {console.log(e);}}";

    this.instance.appendChild(s);
    const del = document.createElement("script");
    del.type = "text/javascript";
    del.async = true;

    del.innerHTML =
      'function declineData(id) {let data = document.getElementById(id);  deleteData(data)  }  async function deleteData(hired) {var id = hired.id; ;   try {const response = await fetch("' +
      localStorage.getItem("hireSendDelete") +
      "\", {headers: {'Content-Type':'application/json', name:" +
      "id" +
      ",},method: 'DELETE',});window.location.reload()} catch (e) {console.log(e);} }";

    this.delete.appendChild(del);
  }

  render() {
    let data = "";
    return (
      <div>
        {this.state.data ? (
          <div>
            {this.state.data.map(elem => {
              data =
                data +
                "<div class='accordion' style='background-color:rgb(52, 58, 64); cursor:default'></div><div class='panel d-flex justify-content-center'>" +
                elem.data.slice(1, elem.data.length - 1) +
                "</div></br>";
                data = data.replace(/(  )/g, '<br>');
              document.getElementById("form").innerHTML = data + "</div>";
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
        <br />
        <div ref={el => (this.instance = el)} />
        <div ref={el => (this.delete = el)} />
        <br />
      </div>
    );
  }
}
