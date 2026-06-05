const express = require("express");
const cors = require("cors");
const port = 8080;
const app = express();
const {
  userListModel: userListModel,
  userModel: userModel,
  photoOfUserModel: photoOfUserModel,
  schemaInfo: schemaModel,
} = require("./modelData/models");
app.use(cors());

app.get("/");

app.listen(port, () => {
  console.log("server is running:", port);
});

app.get("/test/info", (req, res) => {
  const data = schemaModel;
  res.status(200).json(data);
});

app.get("/user/list", (req, res) => {
  const data = userListModel();
  res.status(200).json(data);
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const data = userModel(id);
  res.status(200).json(data);
});

app.get("/photosOfUser/:id", (req, res) => {
  const id = req.params.id;
  const data = photoOfUserModel(id);
  res.status(200).json(data);
});
