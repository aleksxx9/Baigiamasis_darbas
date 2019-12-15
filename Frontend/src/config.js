import React from "react";

export default class Config extends React.Component {
  componentDidMount() {
    localStorage.setItem("login", "http://localhost:3001/api/user/login"); //login backend
    localStorage.setItem("register", "http://localhost:3001/api/user/register"); //register backend
    localStorage.setItem("userInfo", "http://localhost:3001/api/getData"); //creates token and gets user info
    localStorage.setItem(
      "refreshToken",
      "http://localhost:3001/api/refreshToken"
    ); //refreshes token
    localStorage.setItem("createForm", "http://localhost:3001/api/saveForm"); //creates token and gets user info
    localStorage.setItem(
      "getFormNames",
      "http://localhost:3001/api/getFormNames"
    ); //creates token and gets user info
    localStorage.setItem(
      "getAnswerNames",
      "http://localhost:3001/api/getAnswerNames"
    );
    localStorage.setItem("getForm", "http://localhost:3001/api/getForm");
    localStorage.setItem("AnswerForm", "http://localhost:3001/api/formSend");
    localStorage.setItem("Hiring", "http://localhost:3001/api/getAnswers");
    localStorage.setItem("hireSend", "http://localhost:3001/api/hired");
    localStorage.setItem(
      "hireSendDelete",
      "http://localhost:3001/api/hiredDelete"
    );
    localStorage.setItem(
      "getHiredNames",
      "http://localhost:3001/api/getHiredNames"
    );
    localStorage.setItem("hiredGet", "http://localhost:3001/api/hiredGet");
    localStorage.setItem("deleteAll", "http://localhost:3001/api/delete");
    localStorage.setItem("changePassword", "http://localhost:3001/api/changePassword");
    localStorage.setItem("getUserNames", "http://localhost:3001/api/getUserNames");
    localStorage.setItem("addAuth", "http://localhost:3001/api/addAuthor");
    localStorage.setItem("getFormShareNames", "http://localhost:3001/api/getFormShareNames");
    localStorage.setItem("getDeleteNames", "http://localhost:3001/api/getDeleteNames");
    localStorage.setItem("deleteUser", "http://localhost:3001/api/deleteUser");
    localStorage.setItem("updateDate", "http://localhost:3001/api/updateDate");
    localStorage.setItem("popularHired", "http://localhost:3001/api/popularHired");
    localStorage.setItem("popularAnswer", "http://localhost:3001/api/popularAnswer");
  }
  render() {
    return <div></div>;
  }
}
