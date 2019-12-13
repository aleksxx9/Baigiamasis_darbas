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
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      password: "",
      credentials: "",
      jwt: "",
      user: "",
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    //alert(this.state.username + this.state.password);
    if (this.state.jwt.length > 150) {
      const url = localStorage.getItem("userInfo");
      try {
        const response = await fetch(url, {
          headers: { "Content-Type": "application/json" },
          method: "get",
          headers: {
            auth: this.state.jwt,
          },
        });
        this.setState({ credentials: "" });
        const data = await response.json();
        this.setState({ user: data });
      } catch (e) {
        this.setState({
          credentials: "Wrong credentials",
          jwt: "",
        });
        this.user.focus();
        this.user.select();
      }
      if (this.state.user != "" && this.state.user != null && this.state.user.role != "Worker") {
        localStorage.setItem("jwt", this.state.jwt);
        localStorage.setItem("userName", this.state.user.name);
        localStorage.setItem("userRole", this.state.user.role);
        this.setState({ redirect: true });
      } else if (this.state.user != "" && this.state.user != null && this.state.user.role == "Worker") {
        localStorage.setItem("jwt", this.state.jwt);
        localStorage.setItem("userName", this.state.user.name);
        localStorage.setItem("userRole", this.state.user.role);
        console.log(this.state.user);
        this.setState({ redirect2: true });
      }
    }
    else {
      console.log('123');
      this.setState({ credentials: this.state.jwt, jwt: "" });
    }
  }

  //API call to backend to check credentials
  async toggle() {
    const url = localStorage.getItem("login");
    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password,
        }),
      });
      this.setState({ credentials: "" });
      const data = await response.text();
      this.setState({ jwt: data });
      this.handleSubmit();
    } catch (e) {
      this.setState({
        credentials: "Wrong credentials",
        jwt: "",
      });
      this.user.focus();
      this.user.select();
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

  componentDidMount() {
    localStorage.setItem("isLogged", false);
    if (
      localStorage.getItem("userRole") ||
      localStorage.getItem("userName") ||
      localStorage.getItem("jwt")
    ) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
    }
  }

  render() {
    //redirects to main page if login was successfull
    if (this.state.redirect) {
      localStorage.setItem("isLogged", true);
      return (
        <Redirect
          to={{
            pathname: "/mainPage",
          }}
        />
      );
    }
    if (this.state.redirect2) {
      localStorage.setItem("isLogged", true);
      return (
        <Redirect
          to={{
            pathname: "/startPage2",
          }}
        />
      );
    }
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
              Login
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="username" className="float-left">
                    Username
                  </Label>
                  <input
                    autoFocus
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
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
