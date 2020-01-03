import React from "react";
import { Button } from "reactstrap";

export default class mainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <div className="col-3 text-center">
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  marginBottom: "10%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/hiring")}
              >
                Start hiring
              </Button>
            </span>
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  marginBottom: "10%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/archiveNames")}
              >
                Archive
              </Button>
            </span>
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  marginBottom: "10%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/formShare")}
              >
                Share forms
              </Button>
            </span>
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  marginBottom: "10%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/Prolong")}
              >
                Prolong or set date to forms
              </Button>
            </span>
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  marginBottom: "10%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/Statistics")}
              >
                Statistics
              </Button>
            </span>
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  marginBottom: "10%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/delete")}
              >
                Delete form
              </Button>
            </span>
            <span className="d-block">
              <Button
                style={{
                  borderRadius: "0",
                  padding: "5%",
                  width: "100%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(52, 58, 64)"
                }}
                onClick={() => this.props.history.push("/formCreate")}
              >
                Create form
              </Button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
