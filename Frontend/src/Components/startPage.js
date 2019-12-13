import React, { Component } from "react";
import "./login.css";
import {
  Table,
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
      error: "",
      data: null,
    };
  }
  async getFormNames() {
    try {
      const response = await fetch(localStorage.getItem("getFormNames"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data[0])
        this.setState({
          error: "Sorry, currently there are no available positions!",
        });
      this.setState({ data: data });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  componentDidMount() {
    this.getFormNames();
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

  Redirect(name) {
    localStorage.setItem("getFormByName", name);
    this.props.history.push("/formFilling");
  }
  render() {
    return (
      <div>
        {//while there's no data dispalys loader
        this.state.loading || !this.state.data ? (
          <div
            className="w-100 d-flex justify-content-center"
            style={{
              margin: "0",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ display: this.state.display }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "15px" }}>
            {this.state.data.map((name, i) => {
              //let name1 = name.split('\\n');
              let date = new Date();
              let dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
              if(name.role == "Everyone" || name.role == "Regular users" && Date.parse(name.expirationTime) >= Date.parse(dateFormat))
              return (
                <div
                  key={i}
                  className="col-12 d-flex justify-content-center"
                  style={{ marginTop: "10px" }}
                >
                  <Button
                    key={i}
                    className=" btn btn-lg btn-block col-6"
                    style={{ borderRadius: 0, background: "#2F3E48" }}
                    onClick={() => {
                      this.Redirect(name.name);
                    }}
                  >
                    {name.name}
                  </Button>
                </div>
              );
            })}
            <div className="text-danger d-flex justify-content-center">
              {this.state.error}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
