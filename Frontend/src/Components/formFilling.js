import React, { Component, createRef } from "react";
import $ from "jquery";
import "./login.css";
import { Button } from "reactstrap";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

export default class formFilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: [],
      credentials: "",
    };
  }

  fillData(data) {
    this.setState({ data: data.data });
  }

  async getForm() {
    try {
      const response = await fetch(localStorage.getItem("getForm"), {
        headers: {
          "Accept-language": "*",
          "Content-Type": "application/json",
          name: localStorage.getItem("getFormByName"),
        },
        method: "GET",
      });
      const data = await response.json();
      this.fillData(data);
      this.setState({ name: data.name, authors: data.author });
    } catch (e) {
      console.log(e);
      this.setState({ error: e });
    }
  }

  fb = createRef();

  componentDidMount() {
    this.getForm();
  }

  render() {
    let data = "<br>";
    return (
      <div>
        {this.state.data ? (
          Object.keys(this.state.data).map((key, i) => {
            if (this.state.data[key].type == "text") {
              data =
                data +
                "<label>" +
                this.state.data[key].label +
                "</label><input type='" +
                this.state.data[key].type +
                "'class='" +
                this.state.data[key].className +
                "'maxlength='" +
                this.state.data[key].maxlength ;
                data = data + "\" required '";
              
              data = data + "subtype='" + this.state.data[key].subtype + "' ";
              if (this.state.data[key].placeholder)
                data =
                  data +
                  "'placeholder='" +
                  this.state.data[key].placeholder +
                  "'";
              data = data + "name='" + this.state.data[key].name + "'><br>";
            }
            if (this.state.data[key].type == "checkbox-group") {
              if (this.state.data[key].label)
                data =
                  data +
                  "<label>" +
                  this.state.data[key].label +
                  "</label><br>";
              this.state.data[key].values.map((elem, i) => {
                data =
                  data +
                  "<input type='checkbox' id=" +
                  i +
                  elem.value +
                  this.state.data[key].name +
                  " value='" +
                  elem.label +
                  "' name='" +
                  this.state.data[key].label +
                  "'";
                if (elem.selected) {
                  data = data + " checked";
                }
                data =
                  data +
                  "> <label for=" +
                  i +
                  elem.value +
                  this.state.data[key].name +
                  ">" +
                  elem.label +
                  "</label><br>";
              });
            }
            if (this.state.data[key].type == "header") {
              data = data + "<" + this.state.data[key].subtype + ">";
              if (this.state.data[key].label)
                data = data + this.state.data[key].label;
              data = data + "</" + this.state.data[key].subtype + ">";
            }
            if (this.state.data[key].type == "paragraph") {
              data = data + "<" + this.state.data[key].subtype;
              if (this.state.data[key].className)
                data = data + " class='" + this.state.data[key].className + "'";
              data = data + ">";
              if (this.state.data[key].label)
                data = data + this.state.data[key].label;
              data = data + "</" + this.state.data[key].subtype + ">";
            }
            if (this.state.data[key].type == "radio-group") {
              if (this.state.data[key].label)
                data =
                  data +
                  "<label>" +
                  this.state.data[key].label +
                  "</label><br>";

              this.state.data[key].values.map((elem, i) => {
                data =
                  data +
                  "<input type='radio' name=\"" +
                  this.state.data[key].label +
                  "\" id=" +
                  i +
                  elem.value +
                  this.state.data[key].name +
                  " value='" +
                  elem.label +
                  "' ";
                if (elem.selected) {
                  data = data + " checked ";
                }
                if (this.state.data[key].className)
                  data =
                    data + "class='" + this.state.data[key].className + "' ";
                data =
                  data +
                  "> <label for=" +
                  i +
                  elem.value +
                  this.state.data[key].name +
                  ">" +
                  elem.label +
                  "</label><br>";
              });
            }
            if (this.state.data[key].type == "select") {
              data =
                data + "<label>" + this.state.data[key].label + "</label><br>";
              data =
                data +
                "<" +
                this.state.data[key].type +
                " name='" +
                this.state.data[key].label +
                "'";
              if (this.state.data[key].className)
                data = data + " class='" + this.state.data[key].className + "'";
              data = data + ">";

              this.state.data[key].values.map((elem, i) => {
                data = data + "<option value='" + elem.value + "'";
                if (elem.selected) {
                  data = data + " selected";
                }
                data = data + ">" + elem.label + "</option>";
              });
              data = data + "</select><br>";
            }
            if (this.state.data[key].type == "textarea") {
              if (this.state.data[key].label)
                data =
                  data + "<label>" + this.state.data[key].label + "</label>";
              data = data + "<" + this.state.data[key].type + " ";
              if (this.state.data[key].className)
                data = data + "class='" + this.state.data[key].className + "'";
              if (this.state.data[key].placeholder)
                data =
                  data +
                  "placeholder='" +
                  this.state.data[key].placeholder +
                  "'";
              if (this.state.data[key].value)
                data = data + "value='" + this.state.data[key].value + "'";
              if (this.state.data[key].maxLength)
                data =
                  data + "' maxlegth='" + this.state.data[key].maxlength + "'";
              if (this.state.data[key].minLength)
                data =
                  data + "minLength='" + this.state.data[key].minLength + "'";
              if (this.state.data[key].name)
                data = data + "name='" + this.state.data[key].label + "'";

              data = data + "> </" + this.state.data[key].type + ">";
            }
            document.getElementById("form").innerHTML = data;
          })
        ) : (
          <div />
        )}
        <br />
        <div className=" d-flex justify-content-center">
          <h1>{this.state.name}</h1>
        </div>
        <form id="FormFill">
          <div className=" d-flex justify-content-center">
            <div id="form" className="col-8" />
          </div>
        </form>
        <br />
        <div className=" d-flex justify-content-center">
        <div style={{ color: "red" }}>{this.state.credentials}</div>
        </div>
        <br />
        <div className=" d-flex justify-content-center">
        
          <Button
            id="submit"
            onClick={async () => {
              const formData = $("#FormFill").serializeArray();
              let pass = true;
              for (let i=0; i < formData.length; i++ )
              {
                if ( formData[i].value == "") pass = false;
              }
              if (pass){
                this.setState({credentials: ""})
              try {
                const response = await fetch(localStorage.getItem("AnswerForm"), {
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                  body: JSON.stringify({
                    name: this.state.name,
                    data: formData,
                    author: this.state.authors,
                  }),
                });
                alert("Thanks for filling the form!");
               window.location.reload();
              } catch (e) {
                alert(e);
              }}
              else {this.setState({credentials: "Please fill all the fields"})}
            }}
            className="btn btn-success"
            style={{ borderRadius: "0" }}
          >
            Submit
          </Button>
        </div>
        <br />
      </div>
    );
  }
}
