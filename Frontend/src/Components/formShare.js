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

class Share extends Component {
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
    this.changeOptions();
  }

  async changeOptions()
  {
      this.state.data.map((res) => {
        if (this.state.result == res.name) {
          this.setState({ authors: res.author })
        }
      })
      let results = this.state.username.filter(({ email: id1 }) => !this.state.authors.some(({ name: id2 }) => id2 === id1));
      await this.setState({ distinct: results});
  }

  handleSelectUserChange = (event) => {
    this.setState({
      user: event.target.value
    })
  }

handleSubmit(event) {
    const url = localStorage.getItem("addAuth");
    try {
    fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          name: this.state.result,
          author: this.state.user
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
    if (this.state.user == "") {
      if (this.state.distinct)
      {
        await this.setState({user: this.state.distinct[0].email})
        this.handleSubmit();
      }
    }
    else {
      this.setState({ credentials: "" });
      this.handleSubmit();
    }
  }


  componentDidMount() {
    this.getFormNames();
  }

  async getFormNames() {
    try {
      const response = await fetch(localStorage.getItem("getFormShareNames"), {
        headers: { "Content-Type": "application/json", name: localStorage.getItem("userDisplay") },
        method: "GET",
      });
      const data = await response.json();
      const response2 = await fetch(localStorage.getItem("getUserNames"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",

      });
      const data2 = await response2.json();
      if (!data[0])
        this.setState({
          error: "Sorry, currently there are no available positions!",
        });
      this.setState({ result: data[0].name, data: data, username: data2 });
      this.state.data.map(async (res) => {
        if (data2[0].name != res.name) {
         await  this.setState({ authors: res.author })
          this.changeOptions();
        }
      })

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
                    Select person with whom you want to share:
                  </Label>
                  <Input type="select" name="select"  onClick={this.handleSelectUserChange}>
                    {
                      this.state.distinct ? (
                        this.state.distinct.map((name, i) => {
                          return (
                            name.email != localStorage.getItem("userDisplay") ? (
                            <option key={i}>
                              {name.email}
                            </option>
                            ) : (<option hidden></option>)
                          );
                        })
                      ) : (<option hidden></option>)
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

export default Share;
