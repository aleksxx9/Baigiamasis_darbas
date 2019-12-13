import React from "react";
import { Navbar, NavbarBrand, Button, Popover, PopoverBody } from "reactstrap";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";
import { GoPerson } from "react-icons/go";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.popOver = this.popOver.bind(this);
    this.popOver1 = this.popOver1.bind(this);
    this.popOver2 = this.popOver2.bind(this);
    this.popOver3 = this.popOver3.bind(this);
    this.popOver4 = this.popOver4.bind(this);
    this.removeJWT = this.removeJWT.bind(this);
    this.state = {
      popoverOpen: false,
      popoverOpen1: false,
      popoverOpen2: false,
      user: "",
    };
  }

  popOver() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  popOver1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }
  popOver2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2,
    });
  }
  popOver3() {
    this.setState({
      popoverOpen3: !this.state.popoverOpen3,
    });
  }

  popOver4() {
    this.setState({
      popoverOpen4: !this.state.popoverOpen4,
    });
  }

  removeJWT() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  }

  componentDidMount() {
    if (localStorage.getItem("isLogged") == false) {
      localStorage.removeItem("userRole");
    }
  }

  render() {
    return (
      <Navbar
        style={{
          backgroundColor: "#343a40",
          color: "#fff",
        }}
      >
        {//checks which navbar elements to represent
          localStorage.getItem("userName") && (localStorage.getItem("userRole") == "Admin" || localStorage.getItem("userRole") == "Super Admin") ? (
            <div className="col-12" style={{ marginTop: "12px" }}>
              <div className="col-2 col-sm-3 col-md-1 col-lg-1 col-xl-1 d-inline-block text-left">
                <Button
                  id="Home"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => this.props.history.push("/mainPage")}>
                  <FaHome size="25px" />
                </Button>
              </div>
              <div className="col-5 col-sm-3 col-md-7 col-lg-7 col-xl-7 d-inline-block ">
                <NavbarBrand
                  className="navbar-brand"
                  style={{ fontSize: "1em", fontWeight: "bold" }}
                ></NavbarBrand>
              </div>
              <div className="col-5 col-sm-6 col-md-4 col-lg-4 col-xl-4 d-inline-block text-right">
                <Button
                  id="Popover1"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                  onClick={() => this.props.history.push("/Registration")}>
                  <FaUserPlus size="25px" style={{ marginRight: "15px" }} />
                </Button>
                <Button
                  id="Popover"
                  className="text-right d-inline-block"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                  onClick={() => this.props.history.push("/changePassword")}                >
                  <GoPerson size="25px" />
                </Button>
                <Button
                  className="secondary"
                  style={{
                    marginRight: "-15px",
                    float: "right",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={this.removeJWT}                >
                  <GoSignOut size="25px" />
                </Button>
              </div>
            </div>
          ) : (
              <div className="w-100  d-flex justify-content-center">
                {
                  localStorage.getItem("userName") && (localStorage.getItem("userRole") == "Worker") ? (
                    <div className="col-12" style={{ marginTop: "12px" }}>
                      <div className="col-2 col-sm-3 col-md-1 col-lg-1 col-xl-1 d-inline-block text-left">
                        <Button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => this.props.history.push("/startPage2")}>
                          <FaHome size="25px" />
                        </Button>
                      </div>
                      <div className="col-5 col-sm-3 col-md-7 col-lg-7 col-xl-7 d-inline-block ">
                        <NavbarBrand
                          className="navbar-brand"
                          style={{ fontSize: "1em", fontWeight: "bold" }}
                        ></NavbarBrand>
                      </div>
                      <div className="col-5 col-sm-6 col-md-4 col-lg-4 col-xl-4 d-inline-block text-right">
                        <Button
                          className="text-right d-inline-block"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                          }}
                          onClick={() => this.props.history.push("/changePassword")}>
                          <GoPerson size="25px" />
                        </Button>
                        <Button
                          className="secondary"
                          style={{
                            marginRight: "-15px",
                            float: "right",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={this.removeJWT}>
                          <GoSignOut size="25px" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                      <div className="w-100  d-flex justify-content-center">
                        <Button
                          id="Home"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => this.props.history.push("/")}>
                          <FaHome size="25px" />
                        </Button>
                        <NavbarBrand
                          className="navbar-brand mx-auto"
                          style={{ fontSize: "1em", fontWeight: "bold", height: "45px" }} />
                        <div className="col-5 col-sm-6 col-md-4 col-lg-4 col-xl-4 d-inline-block text-right" style={{ marginTop: "12px" }}>
                          <Button
                            id="SignIn"
                            className="secondary"
                            style={{
                              marginRight: "-15px",
                              float: "right",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() => this.props.history.push("/login")}>
                            <GoSignIn size="25px" />
                          </Button>
                        </div>
                      </div>
                    )}
              </div>
            )}
      </Navbar>
    );
  }
}

export default Nav;
