import express from "express";
import controller from "../controller/index.js";
import multer from "../config/multer.js";
import { config } from "dotenv";

config();

export const router = express();

router.post("/upload", multer.single(process.env.up_single), controller.upload);
router.post(
  "/upload-multiple",
  multer.array(process.env.up_single),
  controller.uploads
);

router.get("/files", controller.files);

router.delete("/files", controller.deleteUpload);
