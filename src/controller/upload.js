import aws from "../config/aws.js";
import { config } from "dotenv";
import { uploadFile, listFile, deleteFile } from "./helpers/storage.js";

config();

export const upload = async (req, res) => {
  const { file } = req;
  try {
    const files = await uploadFile(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    ).promise();

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploads = async (req, res) => {
  const { files } = req;
  try {
    const result = [];

    for (const file of files) {
      const filesImg = await uploadFile(
        `imagens/${file.originalname}`,
        file.buffer,
        file.mimetype
      ).promise();

      result.push(filesImg);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const files = async (req, res) => {
  try {
    const file = await listFile();

    return res.status(200).json(file);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUpload = async (req, res) => {
  const { file } = req.query;
  try {
    await deleteFile(file);

    return res.status(200).json({ message: "Deletado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
