import mongoose from "mongoose";

//Function to connect to MongoDB database
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    }); //this is the event listener that logs when the database is connected
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`, {});
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
