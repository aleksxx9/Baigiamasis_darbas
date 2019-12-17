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
import Chart from "react-google-charts";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  async Archive()
  {
    try {
      const response = await fetch(localStorage.getItem("popularHired"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let data1 = data.reduce((res, item) => Object
        .assign(res, {
          [item["name"]]: 1 + (res[item["name"]] || 0)
        }), Object.create(null));

      if (!data[0])
        this.setState({
          error: "Sorry, currently there are no available positions!",
        });
      const response3 = await fetch(localStorage.getItem("getFormNames"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data3 = await response3.json();
      let archiveData = [["name", "count"]];
      data3.map(el => {
        if (data1[el.name]) {
          archiveData.push([el.name, data1[el.name]]);
        }
        else archiveData.push([el.name, 0]);
      });
      this.setState({ archiveData: archiveData });
      this.Filled();
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async Filled()
  {
    try {
      const response = await fetch(localStorage.getItem("popularAnswer"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let data1 = data.reduce((res, item) => Object
        .assign(res, {
          [item["name"]]: 1 + (res[item["name"]] || 0)
        }), Object.create(null));

      if (!data[0])
        this.setState({
          error: "Sorry, currently there are no available positions!",
        });
      const response3 = await fetch(localStorage.getItem("getFormNames"), {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data3 = await response3.json();
      let archiveData = [["name", "count"]];
      data3.map(el => {
        if (data1[el.name]) {
          archiveData.push([el.name, data1[el.name]]);
        }
        else archiveData.push([el.name, 0]);
      });
      this.setState({ filledData: archiveData });
      this.Joined();
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async Joined()
  {
    let joined = [["name", "count"]];
    if(this.state.filledData)
    this.state.filledData.map((el,i) => {
      if ( i != 0)  joined.push([el[0], el[1] + this.state.archiveData[i][1]]);
    })
    await this.setState({joined: joined});
  }

  componentDidMount() {
    this.Archive();
  }


  render() {
    let archive = this.state.archiveData
    let filled = this.state.filledData
    let joined = this.state.joined
    return (
      <div>
        <div className="d-flex justify-content-center" style={{
          marginTop: "12px",
        }}>
          <Chart className="col-12"
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={joined}
            options={{
              // Material design options
              chart: {
                title: 'Most popular forms',
              },
            }}
          />
        </div>
         <div className="d-flex justify-content-center" style={{
          marginTop: "12px",
        }}>
          <Chart className="col-12"
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={filled}
            options={{
              // Material design options
              chart: {
                title: 'Unprocessed forms',
              },
            }}
          />
        </div>
        <div className="d-flex justify-content-center" style={{
          marginTop: "12px",
        }}>
          <Chart className="col-12"
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={archive}
            options={{
              // Material design options
              chart: {
                title: 'Processed forms',
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Statistics;
