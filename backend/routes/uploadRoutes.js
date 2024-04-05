import path from "path";
import express from 'express'
import multer from "multer";    // for handling file uploads 

const router = express.Router()
// Configure multer storage options for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Set filename for uploaded files with a timestamp
  filename: (req, file, cb) => {
    // console.log(req);
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});
// Define a file filter fn to allow only specific file types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  // extract file extension and MIME type
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;
  // check if file type & MIME type match allowed types
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    // reject the file if it doesn't match
    cb(new Error("Images only"), false);
  }
};

// Configure multer with storage and file filter options
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");
// handle POST requests to the specified endpoint ("/")
router.post("/", (req, res) => {
  // use multer mid-ware for single file upload
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

// router.post('/', (req, res)=>{
//     res.send("hello from uploads")
// })

export default router;