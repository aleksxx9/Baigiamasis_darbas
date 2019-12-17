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
              let date = new Date();
              let dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
              if((name.role == "Everyone" || name.role == "Colleagues") && (Date.parse(name.expirationTime) >= Date.parse(dateFormat) || name.expirationTime == ""))
              return (
                <div
                  key={i}
                  className="col-12 d-flex justify-content-center"
                  style={{ marginTop: "10px" }}
                >
                  <Button
                    key={i}
                    className=" btn btn-lg btn-block col-6"
                    style={{ borderRadius: 0, backgroundColor: "rgb(52, 58, 64)" }}
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
