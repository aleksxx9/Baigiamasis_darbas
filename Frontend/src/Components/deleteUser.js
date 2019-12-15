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
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      credentials: "",
      result: "",
      user: "",
      authors: "",
      distinct: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange = async (event) => {
    await this.setState({
      result: event.target.value
    })
  }

async handleSubmit(event) {
    const url = localStorage.getItem("deleteUser");
    try {
    let response = await fetch(url, {
        headers: { "Content-Type": "application/json", name: this.state.result, },
        method: "DELETE",
      });
      this.setState({ credentials: "" });
      let data = await response.text();
      console.log(data);
    } catch (e) {
      console.log(e.message);
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
      const response = await fetch(localStorage.getItem("getDeleteNames"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",

      });
      const data = await response.json();
      if (!data[0])
        this.setState({
          error: "Sorry, currently there are no available positions!",
        });
      this.setState({ result: data[0].email, data: data});
    } catch (e) {
      this.setState({ error: e });
    }
  }

  render() {
    let joined = "";
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
              Delete users
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="role" className="float-left">
                    Select user you want to delete
                  </Label>
                  <Input type="select" name="select" onChange={this.handleSelectChange} id="exampleSelect">
                    {
                      this.state.data ? (
                        this.state.data.map((name, i) => {
                          return (
                            <option key={i}>
                              {name.email}
                            </option>
                          );
                        })) : (<option hidden></option>)
                    }
                  </Input>
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
                  Share
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

export default DeleteUser;
