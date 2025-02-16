import express from "express";
import dotenv from "dotenv";
import db from "./DbConfig/DbConfig.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cors from 'cors'
import userRoute from "./Routes/user.route.js";
import restaurantRoute from "./Routes/restaurant.route.js";
import foodRoute from "./Routes/food.route.js";
import orderRoute from "./Routes/order.route.js";
import cartRoute from './Routes/cart.route.js'

dotenv.config();
db();

const port = process.env.PORT

const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

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
app.use(orderRoute);
app.use(cartRoute);

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log("Port Connected");
});
