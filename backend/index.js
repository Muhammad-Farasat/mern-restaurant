import express from "express";
import dotenv from "dotenv";
import db from "./DbConfig/DbConfig.js";
import userRoute from "./Routes/user.route.js";
import restaurantRoute from "./Routes/restaurant.route.js";
import foodRoute from "./Routes/food.route.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();
db();

const app = express();
app.use(express.json());
app.use(cookieParser());

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "upload",
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`,
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "File upload failed" });
  }

  const imageUrl = req.file.path;
  res.json({
    success: 1,
    image_url: imageUrl,
  });
});

app.use(userRoute);
app.use(restaurantRoute);
app.use(foodRoute);

app.listen("3000", () => {
  console.log("Port Connected");
});
