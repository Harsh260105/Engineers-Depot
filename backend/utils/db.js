import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("mongodb connected successfully");
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default connectDB;


// const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
