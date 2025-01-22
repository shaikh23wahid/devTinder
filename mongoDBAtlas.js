const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash ", passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const objUser = await User.findOne({ emailId: emailId });
    if (!objUser) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, objUser.password);

    if (isPasswordValid) {
      // CREATE a JWT Token
      const token = await jwt.sign({ _id: objUser._id }, "DEV@Tinder$079");
      console.log("token", token);

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token!");
    }

    const decodedMessage = jwt.verify(token, "DEV@Tinder$079");
    const { _id } = decodedMessage;

    console.log("Logged In user is: " + _id);
    const objUser = await User.findById(_id);

    if (!objUser) {
      throw new Error("User does not exist");
    }

    res.send(objUser);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);

  // const user = new User({
  //   firstName: "Wahid",
  //   lastName: "Shaikh",
  //   email: "wahid.shaikh@abc.com",
  //   password: "wahid@123",
  // });

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// GET user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log("req.body", req.body);

  try {
    const objUser = await User.findOne({ emailId: userEmail });
    res.send(objUser);
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (error) {
    res.status(400).send("User not found!");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const arrUsers = await User.find({});
    res.send(arrUsers);
  } catch (error) {
    res.status(404).send("Users not found!");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log("req.body => ", req.body);
  try {
    // const user = await User.findById(userId);
    const user = await User.findByIdAndDelete(userId);
    console.log("user => ", user);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "password",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update note allowed!");
    }

    const objUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(objUser);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update failed due to: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777!");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!!");
  });
