const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://wahidshaikh:KgK3LremvBA36vk5@learning-cluster-1.nlrrl.mongodb.net/userManagement"
  );
};

module.exports = connectDB;
