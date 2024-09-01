const express = require('express');
const multer = require('multer');
const { uploadCSV, checkStatus } = require('../controllers/imageController');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to handle CSV upload and initiate processing
router.post('/upload', upload.single('file'), uploadCSV);

// Route to check the status of processing by requestId
router.get('/status/:requestId', checkStatus);

module.exports = router;

