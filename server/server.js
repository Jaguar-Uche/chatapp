import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// create express app and http server
const app = express();
const server = http.createServer(app); //socket.io supports http server

// Initialize socket.io server

export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "*", // Your frontend domain
    credentials: true, // If you're using cookies
  })
);

//store online users

export const userSocketMap = {}; //userId: socketId

//socket.io connection handler

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clientss

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// middleware setup

app.use(express.json({ limit: "4mb" })); //requests are parsed as json (limited to 4mb)

app.use("/api/status", (req, res) => {
  res.send("Server is running");
  //this res displays on the scren of the browser when we visit /api/status
});

//Route setup
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//connect to the database
await connectDB();

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); //this is logged in the terminal of the code editor not the console of the browser
  });


//Export server for vercel
export default server;
