require("dotenv").config({ path: "./config.env" });
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const course = require("./routes/api/course");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    process.env.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/course", course);
/* if(process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get('/', (req, res) => {
      res.send("Api running");
  })
} */

const port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));