const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello from dashboard!");
// });

app.get(
  "/testing",

  (req, res, next) => {
    console.log("Handling the route user 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    // res.send("Response2");
    next();
  },
  [
    (req, res, next) => {
      console.log("Handling the route user 3");
      res.send("Response3");
    },
  ],
  (req, res, next) => {
    console.log("Handling the route user 4");
    res.send("Response4");
  }
);

app.get("/user/:userId", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Akshay", lastname: "Saini", id: req.query });
});

app.use("/ab*cd", (req, res) => {
  res.send("hahahahaha!");
});

// This will only handle GET call to /user
app.post("/create-user", (req, res) => {
  res.send("Data successfully saved to the database!");
});

// app.use("/hello/2", (req, res) => {
//   res.send("Abracadabra!");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello Hello Hello!");
// });

// This will only handle GET call to /user
// app.use("/user", (req, res) => {
//   res.send({ firstName: "Wahid", lastName: "Shaikh" });
// });

// app.use("/test", (req, res) => {
//   res.send("Hello from the test server from nodemon!");
// });

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777");
});
