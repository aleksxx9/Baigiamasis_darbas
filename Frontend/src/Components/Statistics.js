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

  async Archive() {
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
      let archiveData = [];
      let archiveData1 = [];
      data3.map(el => {
        if (data1[el.name]) {
          archiveData1.push([el.name, data1[el.name]]);
          archiveData.push([el.name, data1[el.name]]);
        }
        else {
          archiveData.push([el.name, 0]);
          archiveData1.push([el.name, 0]);
        }
      });
      this.setState({ archiveDataAll: archiveData1 })
      archiveData.sort(this.sortByProperty("1"));
      archiveData.unshift(["name", "count"]);

      const newArr = [];
      archiveData.map((name, i) => {
        if (i <= 5)
          newArr[i] = name;
      })
      this.setState({ archiveData: newArr });
      this.Filled();
    } catch (e) {
      this.setState({ error: e });
    }
  }
  sortByProperty = function (property) {
    return function (x, y) {
      return (x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1);
    };
  };

  async Filled() {
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
      });
      const data3 = await response3.json();
      let archiveData = [];
      let archiveData1 = [];
      data3.map(el => {
        if (data1[el.name]) {
          archiveData.push([el.name, data1[el.name]]);
          archiveData1.push([el.name, data1[el.name]]);
        }
        else {
          archiveData.push([el.name, 0]);
          archiveData1.push([el.name, 0]);
        }
      });
      this.setState({ filledDataAll: archiveData1 })
      archiveData.sort(this.sortByProperty("1"));
      archiveData.unshift(["name", "count"]);
      const newArr = [];
      archiveData.map((name, i) => {
        if (i <= 5)
          newArr[i] = name;
      })
      this.setState({ filledData: newArr });
      this.Joined();
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async Joined() {
    let joined = [["name", "count"]];
    if (this.state.filledDataAll)
      this.state.filledDataAll.map((el, i) => {
        if (i != 0) joined.push([el[0], el[1] + this.state.archiveDataAll[i][1]]);
      });
    joined.sort(this.sortByProperty("1"));
    joined.unshift(["name", "count"]);
    const newArr = [];
    joined.map((name, i) => {
      if (i <= 5)
        newArr[i] = name;
    })
    await this.setState({ joined: newArr });
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
            width={'600px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={joined}
            options={{
              chart: {
                title: 'TOP 5 forms',
              },
            }}
          />
        </div>
        <div className="d-flex justify-content-center" style={{
          marginTop: "12px",
        }}>
          <Chart className="col-12"
            width={'600px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={filled}
            options={{
              chart: {
                title: 'TOP 5 filled forms',
              },
            }}
          />
        </div>
        <div className="d-flex justify-content-center" style={{
          marginTop: "12px",
        }}>
          <Chart className="col-12"
            width={'600px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={archive}
            options={{
              chart: {
                title: 'TOP 5 archived forms',
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Statistics;
