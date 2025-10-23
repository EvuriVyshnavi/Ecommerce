import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Define storage for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // The files are physically saved in the 'uploads' folder (relative to the server.js path)
    cb(null, 'uploads/'); 
  },
  filename(req, file, cb) {
    // Creates a unique, safe filename using the current date/time and the original extension
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type to allow only images
function checkFileType(file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // Use an Error object instead of a string for better error handling
    cb(new Error('Images only (JPEG, PNG, WEBP)!'), false); 
  }
}

// Initialize multer middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST route for uploading a single image
router.post('/', upload.single('image'), (req, res) => {
  // 🛑 THE CRITICAL FIX IS HERE 🛑
  // We MUST prefix the returned path with '/images' so it matches 
  // the static route configured in server.js (app.use('/images', ...))
  
  if (req.file) {
    // The path is structured to be '/images/filename.ext'
    const filePath = `/images/${req.file.filename}`;
    
    // Send the correct, publicly accessible path back to the client
    res.send({
      message: 'Image uploaded successfully',
      image: filePath, 
    });
  } else {
    res.status(400).send({ message: 'No file uploaded or file type is invalid.' });
  }
});

export default router;