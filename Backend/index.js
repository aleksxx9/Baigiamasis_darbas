const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./auth");
const postRoute = require("./posts");
const saveForm = require("./saveForm");
const formSend = require("./sendForm");
const getForm = require("./getForm");
const getAnswerNames = require("./getAnsweNames");
const getHiredNames = require("./getHiredNames");
const getAnswers = require("./getAnswers");
const getFormNames = require("./getFormNames");
const hired = require("./hired");
const refreshToken = require("./refreshToken");
const hiredDelete = require("./deleteForm");
const hiredGet = require("./hiredGet");
const DeleteForm = require("./deleteFillForm");
const cors = require("cors");
const changePassword = require("./changePassword");
const addAuthor = require('./addAuthor');
const userNames = require('./getUserNames');
const getFormShareNames = require('./getFormShareNames');
const getDeleteNames = require('./getDeleteNames');
const deleteUser = require('./deleteUser');
const updateDate = require('./updateDate');
const popularAnswer = require('./getPopularAnswer');
const popularHired = require('./getPopularHired');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

app.use(express.json());
app.use(cors());
app.use("/api/hiredGet", hiredGet);
app.use("/api/user", authRoute);
app.use("/api/getData", postRoute);
app.use("/api/saveForm", saveForm);
app.use("/api/getAnswers", getAnswers);
app.use("/api/hired", hired);
app.use("/api/delete", DeleteForm);
app.use("/api/hiredDelete", hiredDelete);
app.use("/api/formSend", formSend);
app.use("/api/getForm", getForm);
app.use("/api/getAnswerNames", getAnswerNames);
app.use("/api/getHiredNames", getHiredNames);
app.use("/api/getFormNames", getFormNames);
app.use("/api/refreshToken", refreshToken);
app.use("/api/changePassword", changePassword);
app.use("/api/addAuthor", addAuthor);
app.use("/api/getUserNames", userNames);
app.use("/api/getFormShareNames", getFormShareNames);
app.use("/api/getDeleteNames", getDeleteNames);
app.use("/api/deleteUser", deleteUser);
app.use("/api/updateDate", updateDate);
app.use("/api/popularAnswer", popularAnswer)
app.use("/api/popularHired", popularHired);

app.listen(3001, console.log("..."));
