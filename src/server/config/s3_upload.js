import aws from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";
import path from "path";

const AWS_CONFIG = aws.config.accessKeyId;

const s3Bucket = new aws.S3();

const UploadConfigS3 = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: "sport-app-mern",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const extention = path.extname(file.originalname);
      const name = path.basename(file.originalname, extention);

      cb(null, `${name.replace(/\s/g, "")}-${Date.now()}${extention}`);
    },
  }),
});

export default UploadConfigS3;
