const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// FRONTEND CONNECT
app.use(express.static(path.join(__dirname, "../frontend")));

const filePath = path.join(__dirname, "data.json");

// READ DATA
function readData() {

  const data = fs.readFileSync(filePath);

  return JSON.parse(data);

}

// WRITE DATA
function writeData(data) {

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );

}

// REGISTER
app.post("/register", (req, res) => {

  const data = readData();

  const userExists = data.users.find(
    u => u.username === req.body.username
  );

  if(userExists){

    return res.json({
      success: false,
      message: "User Already Exists"
    });

  }

  data.users.push(req.body);

  writeData(data);

  res.json({
    success: true
  });

});

// LOGIN
app.post("/login", (req, res) => {

  const data = readData();

  const user = data.users.find(
    u =>
      u.username === req.body.username &&
      u.password === req.body.password
  );

  if(user){

    res.json({
      success: true
    });

  } else {

    res.json({
      success: false
    });

  }

});

// GET TASKS
app.get("/tasks", (req, res) => {

  const data = readData();

  res.json(data.tasks);

});

// ADD TASK
app.post("/tasks", (req, res) => {

  const data = readData();

  data.tasks.push(req.body);

  writeData(data);

  res.json({
    success: true
  });

});

// DELETE TASK
app.delete("/tasks/:index", (req, res) => {

  const data = readData();

  data.tasks.splice(req.params.index, 1);

  writeData(data);

  res.json({
    success: true
  });

});

// COMPLETE TASK
app.put("/tasks/:index", (req, res) => {

  const data = readData();

  data.tasks[req.params.index].completed =
    !data.tasks[req.params.index].completed;

  writeData(data);

  res.json({
    success: true
  });

});

// START SERVER
app.listen(3000, () => {

  console.log("Server Running On Port 3000");

});