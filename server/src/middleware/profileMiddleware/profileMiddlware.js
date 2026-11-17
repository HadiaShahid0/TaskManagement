import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/uploads/avaters");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() + '-' + Math.round(Math.random() * 1E9)+ path.extname(file.originalname) // add the current date, random number 1E9=> 10^9, then file extension
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;