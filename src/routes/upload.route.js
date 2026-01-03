const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFile } = require('../controllers/upload.controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const allowed = ['.xlsx', '.csv'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

router.post('/', upload.single('file'), uploadFile);

module.exports = router;
