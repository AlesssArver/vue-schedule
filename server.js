const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const schedules = require("./db/schedules.json");
//
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => console.log("Server started on port 3000"));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API."
  });
});

app.get("/schedules", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", err => {
    if (err) res.sendStatus(401);
    else res.json({ schedules });
  });
});

app.post("/register", (req, res) => {
  if (req.body) {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    };

    const data = JSON.stringify(user, null, 2);
    var dbUserEmail = require("./db/users.json").users.email;

    if (dbUserEmail === req.users.email) res.sendStatus(400);
    else {
      fs.writeFile("./db/users.json", data, err => {
        if (err) console.log(err + data);
        else {
          const token = jwt.sign({ user }, "the_secret_key");
          res.json({
            token,
            email: user.email,
            name: user.name,
            surname: user.surname
          });
        }
      });
    }
  } else res.sendStatus(400);
});

app.post("/login", (req, res) => {
  const userDB = fs.readFileSync("./db/users.json");
  const userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, "the_secret_key");
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name
    });
  } else res.sendStatus(400);
});

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else res.sendStatus(401);
}
