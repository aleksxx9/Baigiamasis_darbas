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
      password: "",
      newPassword: "",
      repeatPassword: "",
      credentials: "",
      jwt: "",
      user: "",
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleNewPassword(event) {
    this.setState({ newPassword: event.target.value });
  }

  handleRepeatPassword(event) {
    this.setState({ repeatPassword: event.target.value });
  }

  async handleSubmit(event) {
    if (this.state.newPassword == this.state.repeatPassword && this.state.newPassword.replace(/\s/g,"") != ""  && this.state.newPassword.length >= 6) {
      if (this.state.jwt.length > 150) {
        const url = localStorage.getItem("changePassword");
        try {
          const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify({
              email:localStorage.getItem("userDisplay"),
              newPassword:this.state.newPassword,
              repeatPassword:this.state.repeatPassword,
              password:this.state.password,
            })
          });
          this.setState({ credentials: "" });
          const data = await response.text();
          this.setState({ user: data, newPassword: "", repeatPassword: "", password: "" });
        } catch (e) {
          console.log(e)
          this.setState({
            credentials: "Wrong credentials",
            jwt: "",
          });
          this.user.focus();
          this.user.select();
        }
        if (this.state.credentials == "") this.setState({ credentials: "Success" });
      }
      else {
        this.setState({ credentials: this.state.jwt, jwt: "" });
      }
    }
    else {
      this.setState({ credentials: "Passwords doesn't match" });
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
          email: localStorage.getItem("userDisplay"),
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
  handleKeyPass = e => {
    if (e.key === "Enter") {
      this.passnew.focus();
    }
  };
  handleKeyPassNew = e => {
    if (e.key === "Enter") {
      this.passrep.focus();
    }
  };

  handleKey = e => {
    if (e.key === "Enter") {
      this.toggle();
    }
  };

  componentDidMount() {

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
              Change password for user: <div><b>{localStorage.getItem("userName")}</b></div>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="username" className="float-left">
                    Current password
                  </Label>
                  <input
                    autoFocus
                    onClick={() => {
                      this.user.select();
                    }}
                    className="form-control"
                    ref={user => (this.user = user)}
                    value={this.state.password}
                    onChange={this.handlePassword}
                    onKeyUp={this.handleKeyPass}
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="float-left">
                    New password
                  </Label>
                  <input
                    onClick={() => {
                      this.passnew.select();
                    }}
                    className="form-control"
                    ref={passnew => (this.passnew = passnew)}
                    onKeyUp={this.handleKey}
                    value={this.state.newPassword}
                    onChange={this.handleNewPassword}
                    onKeyUp={this.handleKeyPassNew}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder=""
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="float-left">
                    Repeat password
                  </Label>
                  <input
                    onClick={() => {
                      this.passrep.select();
                    }}
                    className="form-control"
                    ref={passrep => (this.passrep = passrep)}
                    onKeyUp={this.handleKey}
                    value={this.state.repeatPassword}
                    onChange={this.handleRepeatPassword}
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
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
                  Change password
                </Button>
                {this.state.credentials == "Success" ? (<div style={{ color: "green" }}>{this.state.credentials}</div>) : (<div style={{ color: "red" }}>{this.state.credentials}</div>)}

              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
