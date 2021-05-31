import multer from "multer";
import path from "path";

const UploadConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "files"),
    filename: (req, file, callback) => {
      const extention = path.extname(file.originalname);
      const name = path.basename(file.originalname, extention);
      callback(null, `${name.replace(/\s/g, "")}-${Date.now()}${extention}`);
    },
  }),
};

export default UploadConfig;
