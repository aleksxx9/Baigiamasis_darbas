import React, { Component } from "react";
import "./hiring.css";
import { FaYCombinator } from "react-icons/fa";

export default class hiringAccept extends Component {
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
      const response = await fetch(localStorage.getItem("Hiring"), {
        headers: {
          "Content-Type": "application/json",
          name: localStorage.getItem("getFormByName"),
        },
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (!data) {
        this.props.history.push("/mainPage");
      }
      if (!data[0]) this.props.history.push("./mainPage");
      this.setState({ name: data[0].name });
      await this.fillData(data);
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async componentDidMount() {
    await this.getForm();
    if (this.state.data[0]) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      ; s.innerHTML =
        'function sendData(id) {let data = document.getElementById(id); sendData1(data)  }  async function sendData1(hired) {var id = hired.id;' +
        'const name1 = $(document.getElementById("Name")).prop("innerHTML");' +
        'var str = $(hired).prop("outerHTML"); let newMessage = str.replace(/"/g, "\'"); newMessage = newMessage.replace(/<\\/?("[^"]*"|\'[^\']*\'|[^>])*(>|$)/g, " ");' +
        'try {const response = await fetch("' +
        localStorage.getItem("hireSend") +
        "\", {headers: { 'Content-Type': 'application/json' },method: 'POST', body: JSON.stringify({name: " +
        "name1" +
        ', data: newMessage, author: ' + JSON.stringify(this.state.data[0].author) + '}),});}catch (e) {} try {const response = await fetch("' +
        localStorage.getItem("hireSendDelete") +
        "\", {headers: {'Content-Type':'application/json', name:" +
        "id" +
        ",},method: 'DELETE',}); window.location.reload()} catch (e) {console.log(e);}}";
      if (this.instance) this.instance.appendChild(s);
      const del = document.createElement("script");
      del.type = "text/javascript";
      del.async = true;
      del.innerHTML =
        'function declineData(id) {let data = document.getElementById(id);  deleteData(data)  }  async function deleteData(hired) {var id = hired.id; ;   try {const response = await fetch("' +
        localStorage.getItem("hireSendDelete") +
        "\", {headers: {'Content-Type':'application/json', name:" +
        "id" +
        ",},method: 'DELETE',});window.location.reload()} catch (e) {console.log(e);} }";
      if (this.delete != null) this.delete.appendChild(del);
    }
  }

  render() {
    let data = "";
    return (
      <div>
        {this.state.data ? (
          <div>
            {this.state.data.map(elem => {
              const newElem = elem.data;
              data =
                data +
                "<div><div class='accordion' style='background-color:rgb(52, 58, 64); cursor:default' " +
                ">" +
                newElem[0].value +
                " " +
                newElem[1].value +
                "</div><div class='panel '><p><form id='" +
                elem._id +
                "'>";

              newElem.map(e => {
                data = data + "<b>" + e.name + ":</b> " + e.value + "<br />";
              });
              data =
                data +
                "</form></p><button onClick=\"sendData('" +
                elem._id +
                "')\" class='float-right btn btn-success'>Accept</button><button onClick=\"declineData('" +
                elem._id +
                "')\" style='margin-bottom:15px; margin-right:15px' class='float-right btn btn-danger'>Decline</button><br /></div></div>";

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
        <div ref={el => (this.instance = el)} />;
        <div ref={el => (this.delete = el)} />;
        <br />
      </div>
    );
  }
}
