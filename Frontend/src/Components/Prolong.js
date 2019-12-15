import React, { Component } from "react";
import "./login.css";
import {
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Card,
  Input,
} from "reactstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Prolong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      credentials: "",
      result: "",
      user: "",
      authors: "",
      distinct: "",
      startDate: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = date => {
    this.setState({
      startDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    });
  };

  handleSelectChange = async (event) => {
    await this.setState({
      result: event.target.value
    })
    //this.changeOptions();
  }

  async changeOptions() {
    this.state.data.map((res) => {
      if (this.state.result == res.name) {
        this.setState({ authors: res.author })
      }
    })
    let results = this.state.username.filter(({ email: id1 }) => !this.state.authors.some(({ name: id2 }) => id2 === id1));
    await this.setState({ distinct: results });
  }

  handleSelectUserChange = (event) => {
    this.setState({
      user: event.target.value
    })
  }

  handleSubmit(event) {
    const url = localStorage.getItem("updateDate");
    try {
      fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          name: this.state.result,
          expiration: this.state.startDate,
        })
      });
      this.setState({ credentials: "" });

    } catch (e) {
      console.log(e)
    }
    window.location.reload();
  }

  //API call to backend to check credentials
  async toggle() {
    this.handleSubmit();
  }


  componentDidMount() {
    this.getFormNames();
  }

  async getFormNames() {
    try {
      const response = await fetch(localStorage.getItem("getFormShareNames"), {
        headers: { "Content-Type": "application/json", name: localStorage.getItem("userDisplay"), role: localStorage.getItem("userRole") },
        method: "GET",
      });
      const data = await response.json();
      if (!data[0])
        this.setState({
          error: "Sorry, currently there are no available positions!",
        });
      this.setState({ result: data[0].name, data: data });

    } catch (e) {
      this.setState({ error: e });
    }
  }

  render() {
    return (
      <div>
        <div
          className="w-100  d-flex justify-content-center"
          style={{
            marginTop: "12px",
          }}
        >
          <Card>
            <CardHeader
              className="text-left text-large h5"
              style={{
                backgroundColor: "#beeff7",
                color: "#212529",
              }}
            >
              Share your form!
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="role" className="float-left">
                    Select form you want to share:
                  </Label>
                  <Input type="select" name="select" onChange={this.handleSelectChange} id="exampleSelect">
                    {
                      this.state.data ? (
                        this.state.data.map((name, i) => {
                          return (
                            <option key={i}>
                              {name.name}
                            </option>
                          );
                        })) : (<option hidden></option>)
                    }
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="role" className="float-left">
                    Current Date:
                  </Label>
                  <Label for="role" className="float-left">
                    {this.state.data ? (this.state.data.map((data, i) => {
                      return (
                      <div key={i}>
                      {
                        data.name == this.state.result ? (<div style={{marginLeft:"5px"}} key={i}>{data.expiration}</div>) : (<div key={i}></div>)
                      }
                      </div>
                      );
                    })) : (<div ></div>)}
                  </Label>

                </FormGroup>
                <FormGroup>
                  <Label>
                    Change or set date
                  </Label>
                  <br />
                  <DatePicker
                    className="form-control"
                    todayButton="Reset"
                    selected={this.state.date}
                    onSelect={this.handleChange}
                    onChange={this.handleChange}
                    value={this.state.startDate}
                    dateFormat="yyyy/MM/dd"
                  />
                </FormGroup>

                <Button
                  onClick={() => {
                    this.toggle();
                  }}
                  className="float-right btn-block"
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    opacity: ".65",
                  }}
                >
                  Change date
                </Button>
                <div style={{ color: "red" }}>{this.state.credentials}</div>
                <div style={{ color: "green" }}>
                  {this.state.credentialsSuccess}
                </div>
              </Form><Label style={{fontSize: "12px"}}>Note: by leaving field empty form wont have expiration time</Label>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
export default Prolong;
