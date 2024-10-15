const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all GET, POST... requests
app.use("/admin", adminAuth);

app.use("/user", userAuth, (req, res) => {
  res.send("User data sent");
});

app.use("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.use("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("Server is succesfully listening on port 7777");
});
