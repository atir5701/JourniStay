const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const downloader = require("image-downloader");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(CookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connceted");
});

app.get("/", (req, rs) => {
  return rs.send("SERVER STARTED");
});

const jwtSecret = "atirkeyforauth";

app.post("/register", async (req, res) => {
  const data = req.body;
  data.password = await bcrypt.hashSync(data.password, 10);
  const newUser = await User.create(data);
  return res.status(200).json({ message: "User Added Successfully" });
});

app.post("/login", async (req, res) => {
  const data = req.body;
  const email = data.email;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(data.password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          name: userDoc.name,
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", " ").json(true);
});

app.post("/uploadlink", async (req, res) => {
  const { link } = req.body;

  const newName = Date.now() + ".jpg";
  const p = path.join(__dirname, "uploads", newName);
  await downloader.image({
    url: link,
    dest: p,
  });
  const pNew = "/uploads/" + newName;
  return res.status(200).json({ data: pNew });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const upload = multer({ storage });

app.post("/uploadPhoto", upload.single("photos"), async (req, res) => {
  res.json({
    message: "File uploaded successfully",
    filename: req.file.originalname, // Keep original name
    filePath: `/uploads/${req.file.originalname}`,
  });
});

app.post("/newPlace", async (req, res) => {
  const data = req.body;
  const placeDoc = await Place.create(data);
  res.json({ message: "Place added succefully" });
});

app.get("/places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const placeId = req.params.id;
  res.json(await Place.findById(placeId));
});

app.put("/updatPlace/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updatedPlace = await Place.findByIdAndUpdate(id, newData, {
    new: true,
  });
  return res.json(updatedPlace);
});

app.get("/allPlaces", async (req, res) => {
  const data = await Place.find();
  return res.json(data);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "atirpatel1075@gmail.com",
    pass: "fusw djvp yycc ixwf",
  },
});

app.post("/booking", async (req, res) => {
  const data = req.body;
  const book = await Booking.create(data);
  const place = await Place.findById(data.place);
  const subject = "Your Booking confirmation for " + place.address;
  const mailOptions = {
    from: "missionhack@gmail.com",
    to: data.email,
    subject: subject,
    text: `Dear ${data.name},

    Thank you for booking with us! We are pleased to confirm your reservation.
    Check-In Date: ${data.checkIn}  
    Check-Out Date: ${data.checkOut}  

    We look forward to hosting you and ensuring you have a comfortable stay. If you have any questions or special requests, feel free to reach out.

    Best Regards,  
    StayNest`,
  };

  await transporter.sendMail(mailOptions);
  return res.json(book);
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    console.log(userData)
    const { name } = userData;
    res.json(await Booking.find({ name: { $regex: new RegExp(name, 'i') } }));
  });
});

app.delete("/deleteBooking/:id",async(req,res)=>{
  const {id} = req.params
  const data = await Booking.findByIdAndDelete(id);
  return res.json("Booking deleted")
})

app.listen(8000, console.log("Server Started at port 8000"));
