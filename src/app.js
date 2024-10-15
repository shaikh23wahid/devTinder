const express = require("express");

const app = express();

app.use("/getUserData", (req, res) => {
  // try {
  // Logic of DB call and get user data

  throw new Error("Test error");
  res.send("User data sent");
  // } catch (err) {
  //   res.status(500).send("Some error contact support team");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777");
});
