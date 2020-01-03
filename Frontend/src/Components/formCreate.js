import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button, Input } from "reactstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

export default class formCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //startDate: new Date().getFullYear() + "-" + (new Date().getMonth() +1) + "-" + new Date().getDate() ,
      role: "Everyone",
      startDate: "",
      input: "",
    };
    this.handleinput = this.handleinput.bind(this);
  }

  handleKey = e => {
    if (e.key === "Enter") {
      document.getElementById("saveData").click();
    }
  };

  handleinput(event) {
    this.setState({ input: event.target.value });
  }

  handleChange = date => {
    this.setState({
      startDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    });
  };

  handleSelect = (event) => {
    this.setState({ role: event.target.value })
  }

  async saveForm(data) {
    try {
      await fetch(localStorage.getItem("createForm"), {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("name").value,
          data: JSON.parse(data),
          expirationTime: this.state.startDate,
          role: this.state.role,
          author: localStorage.getItem("userDisplay"),
        }),
      });
      alert("Form created successfully");
    } catch (e) { }
  }

  fb = createRef();
  componentDidMount() {
    const options = {
      defaultFields: [
        {
          type: "text",
          required: true,
          label: "First Name",
          placeholder: "Enter your first name",
          className: "form-control",
          name: "first-name",
          subtype: "text",
          maxlength: 30,
        },
        {
          type: "text",
          required: true,
          label: "Last Name",
          placeholder: "Enter your last name",
          className: "form-control",
          name: "last-name",
          subtype: "text",
          maxlength: 30,
        },
        {
          type: "text",
          subtype: "tel",
          required: true,
          label: "Phone number",
          placeholder: "Enter phone number",
          className: "form-control",
          name: "phone",
          maxlength: 20,
        },
        {
          type: "text",
          subtype: "email",
          required: true,
          label: "E.mail",
          placeholder: "Enter e.mail",
          className: "form-control",
          name: "email",
          maxlength: 50,
        },
      ],
      disabledFieldButtons: {
        text: ["remove", "edit", "copy"],
      },
      disabledAttrs: [
        "required",
        "access",
        "toggle",
        "inline",
        "description",
        "other",
        "placeholder",
        "multiple",
        "type",
      ],
      disabledSubtypes: {
        textarea: ["tinymce", "quill"],
      },
      disableFields: [
        "autocomplete",
        "date",
        "file",
        "hidden",
        "button",
        "text",
        "number",
      ],
      disabledActionButtons: ["data", "save", "clear"],
      controlPosition: "left",
    };
    let fbTemplate = document.getElementById("build-wrap");
    let formBuilder = $(fbTemplate).formBuilder(options);
    document.getElementById("saveData").addEventListener("click", () => {
      if (document.getElementById("name").value) {
        if (document.getElementById("name").value.indexOf('ą') == -1  && document.getElementById("name").value.indexOf('č') == -1 && document.getElementById("name").value.indexOf('ę') == -1&& document.getElementById("name").value.indexOf('ė') == -1&& document.getElementById("name").value.indexOf('į') == -1&& document.getElementById("name").value.indexOf('š') == -1&& document.getElementById("name").value.indexOf('ų') == -1&& document.getElementById("name").value.indexOf('ū') == -1&& document.getElementById("name").value.indexOf('žą') == -1 )
        {
          this.saveForm(formBuilder.actions.save());
          formBuilder.actions.clearFields();
          window.location.reload();}
        else {
          alert("ą č ę ė į š ų ū ž are not allowed in the name");
        }
      } else {
        alert("Form name is required");
        this.input.focus();
      }
    });

    document.getElementById("clear-all-fields").onclick = function () {
      window.location.reload();
    };
  }

  render() {
    return (
      <div>
        <div
          style={{ marginTop: "25px", marginBottom: "25px" }}
          className="d-flex justify-content-center"
        >
          <label style={{ marginRight: "15px" }}>Form name: </label>
          <input
            ref={input => (this.input = input)}
            className="input-group form-control col-4"
            id="name"
            onKeyUp={this.handleKey}
          ></input>
        </div>
        <div
          style={{ marginTop: "25px", marginBottom: "25px" }}
          className="d-flex justify-content-center"
        >
          <br />
          <Input type="select" name="select" className="input-group form-control col-2 "  style={{marginRight:"50px"}} onChange={this.handleSelect}>
            <option value="Everyone">Everyone</option>
            <option value="Regular users">Regular users</option>
            <option value="Colleagues">Colleagues</option>
          </Input>

          <DatePicker
            className="input-group form-control"
            todayButton="Reset"
            selected={this.state.date}
            onSelect={this.handleChange}
            onChange={this.handleChange}
            value={this.state.startDate}
            dateFormat="yyyy/MM/dd"
          />
          <Button className="btn btn-light" style={{ backgroundColor: "white", border: "1px solid #ced4da" }} onClick={() => {
            this.setState({startDate: ""});
          }}> Disable date</Button>
        </div>
        <div id="build-wrap"></div>

        <div
          className="saveDataWrap d-flex justify-content-center"
          style={{ marginTop: "15px" }}
        >
          <div className="addFieldWrap">
            <Button
              style={{ marginRight: "15px", borderRadius: "0" }}
              id="clear-all-fields"
              className="btn btn-danger d-inline"
              type="button"
            >
              Clear Fields
            </Button>
          </div>
          <Button
            id="saveData"
            type="button"
            style={{ borderRadius: "0" }}
            className="success btn  btn-success d-inline"
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}
