import React, { Component } from "react";
import { Button } from "reactstrap";

class archiveNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      data: null,
    };
  }
  async getFormNames() {
    try {
      const response = await fetch(localStorage.getItem("getHiredNames"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });

      const data = await response.json();
      if (!data[0])
        this.setState({
          error: "There are no forms to review!",
        });
      this.setState({ data: data });
    } catch (e) {
      alert(e);
      this.setState({ error: e });
    }
  }

  componentDidMount() {
    this.getFormNames();
  }

  Redirect(name) {
    localStorage.setItem("getArchiveByName", name);
    this.props.history.push("/archive");
  }
  render() {
    let admin = 0;
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
                  admin = 1;
                  return (
                    <div key={i}>
                      {
                        name.author.map((auth, j) => {
                          return (
                            <div key={j}>
                              {
                                ((auth.name == localStorage.getItem("userDisplay") || localStorage.getItem("userRole") == "Super Admin") && admin == 1)
                                  ? (<div style={{ alignContent: "center" }}>
                                    {
                                      localStorage.getItem("userRole") == "Super Admin" ? (admin = 0, <div></div>) : (<div></div>)}
                                    <div
                                      key={i}
                                      style={{ marginTop: "10px", display: "block", float: "left", width: "145px", marginLeft: "15px" }}
                                    >
                                      <Button
                                        key={i}
                                        className=" btn btn-lg btn-block col-12"
                                        style={{ textAlign: "center", borderRadius: 0, overflow: "hidden", backgroundColor: "rgb(52, 58, 64)", height: "120px" }}
                                        onClick={() => {
                                          this.Redirect(name.name);
                                        }}
                                      >
                                        <p style={{ textAlign: "center", width: "100%", fontSize: "15px", overflow: "hidden" }}>{name.name}</p>
                                      </Button>
                                    </div>
                                  </div>
                                  ) : (<div key={j}> </div>)
                              }
                            </div>
                          );
                        }
                        )
                      }
                    </div>
                  );
                })}
              </div>
            )}
        <div className="d-flex justify-content-center text-danger">
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default archiveNames;
