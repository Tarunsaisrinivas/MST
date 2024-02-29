import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
let isConnected = false;
let mydb, users;

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mstproject.netlify.app/"],
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

const User = mongoose.model(
  "user",
  mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MongoURL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log("Error in connecting DB");
    console.log(err);
  });

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    User.findOne({ email: email }).then((usr) => {
      if (usr) {
        if (usr.password === password)
          res.status(200).json({
            email: usr.email,
            message: "login success",
            name: usr.name,
          });
        else res.status(401).json({ message: "Invalid Password" });
      } else {
        res.status(404).json({ message: "Invalid user" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      res.status(409).json({ message: "user already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 3);

    const newUser = new User({
      name,
      email,
      password,
    });
    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User Register Succesfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error in inserting in Database" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5050, () => {
  console.log("Server running on 5050");
});
