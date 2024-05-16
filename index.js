require("dotenv").config();
const express = require("express");

// Database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoute");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Cors
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening to port: ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
