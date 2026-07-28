const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const { verifyToken } = require('../middlewares/auth');

router.post('/merge', pdfController.mergePDFs);
router.post('/split', pdfController.splitPDF);
router.post('/compress', pdfController.compressPDF);
router.post('/ai-summary', pdfController.aiSummary);
router.post('/ai-chat', pdfController.aiChat);

module.exports = router;
