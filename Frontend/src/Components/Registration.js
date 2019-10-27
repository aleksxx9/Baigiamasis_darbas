import React, { Component } from "react";
import {
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Card,
} from "reactstrap";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      password: "",
      name: "",
      role: "",
      credentials: "",
      credentialsSuccess: "",
      jwt: "",
      user: "",
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }
  handleRole(event) {
    this.setState({ role: event.target.value });
  }
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    //alert(this.state.username + this.state.password);
    if (this.state.responseData == "Success") {
      this.setState({ credentials: "Success" });
      this.setState({ name: "", username: "", password: "", role: "" });
    }
  }

  //API call to backend to check credentials
  async toggle() {
    const url = localStorage.getItem("register");
    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          role: "admin",
          email: this.state.username,
          password: this.state.password,
        }),
      });
      //this.setState({ credentials: "" });
      const data = await response.text();
      console.log(data);
      if (data == "Success" || data == "{}") {
        this.setState({ credentialsSuccess: data });
        this.setState({ credentials: "" });
        window.location.reload();
      } else {
        this.setState({ credentials: data });
        this.setState({ credentialsSuccess: "" });
      }
    } catch (e) {
      this.setState({
        credentials: "Wrong credentials",
      });
      this.name.focus();
      this.name.select();
    }
  }

  //Key press event handlers
  handleKeyUsername = e => {
    if (e.key === "Enter") {
      this.pass.focus();
    }
  };

  handleKey = e => {
    if (e.key === "Enter") {
      this.toggle();
    }
  };

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
              Register
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name" className="float-left">
                    Name
                  </Label>
                  <input
                    onClick={() => {
                      this.name.select();
                    }}
                    className="form-control"
                    ref={name => (this.name = name)}
                    value={this.state.name}
                    onChange={this.handleName}
                    onKeyUp={this.handleKeyName}
                    type="text"
                    name="name"
                    id="name"
                    placeholder=""
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="username" className="float-left">
                    Email
                  </Label>
                  <input
                    onClick={() => {
                      this.user.select();
                    }}
                    className="form-control"
                    ref={user => (this.user = user)}
                    value={this.state.username}
                    onChange={this.handleUsername}
                    onKeyUp={this.handleKeyUsername}
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="float-left">
                    Password
                  </Label>
                  <input
                    onClick={() => {
                      this.pass.select();
                    }}
                    className="form-control"
                    ref={pass => (this.pass = pass)}
                    onKeyUp={this.handleKey}
                    value={this.state.password}
                    onChange={this.handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
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
                  Login
                </Button>
                <div style={{ color: "red" }}>{this.state.credentials}</div>
                <div style={{ color: "green" }}>
                  {this.state.credentialsSuccess}
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Registration;
