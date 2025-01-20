const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://wahidshaikh:<djakbfksdjsdbzdgusdjk>@learning-cluster-1.nlrrl.mongodb.net/userManagement"
  );
};

module.exports = connectDB;
