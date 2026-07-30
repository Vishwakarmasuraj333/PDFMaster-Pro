const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfController = require('../controllers/pdfController');
const { verifyToken } = require('../middlewares/auth');

const upload = multer({
  dest: path.join(__dirname, '../uploads/temp'),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

router.post('/merge', upload.array('files', 10), pdfController.mergePDFs);
router.post('/split', upload.single('file'), pdfController.splitPDF);
router.post('/compress', upload.single('file'), pdfController.compressPDF);
router.post('/ai-summary', upload.single('file'), pdfController.aiSummary);
router.post('/ai-chat', upload.single('file'), pdfController.aiChat);

module.exports = router;
