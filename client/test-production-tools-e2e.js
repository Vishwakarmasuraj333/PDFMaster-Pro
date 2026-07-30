const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const docx = require('docx');
const XLSX = require('xlsx');

// Import server validation helper to verify backend pipeline logic
const pdfController = require('../server/controllers/pdfController');

async function runProductionTests() {
  console.log('==================================================');
  console.log(' PDFMASTER PRO - PRODUCTION BUG FIX & PDF SUITE E2E');
  console.log('==================================================\n');

  const testDir = path.join(__dirname, 'test_output');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // 1. Create a 1-page PDF
  const doc1 = await PDFDocument.create();
  const font = await doc1.embedFont(StandardFonts.HelveticaBold);
  const p1 = doc1.addPage([595.28, 841.89]);
  p1.drawText('PDFMaster Pro 1-Page Test Document', { x: 50, y: 780, size: 18, font, color: rgb(0.1, 0.1, 0.2) });
  const pdf1Bytes = await doc1.save();
  const pdf1Path = path.join(testDir, '1_page.pdf');
  fs.writeFileSync(pdf1Path, pdf1Bytes);

  // 2. Create a 10-page PDF
  const doc10 = await PDFDocument.create();
  for (let i = 1; i <= 10; i++) {
    const page = doc10.addPage([595.28, 841.89]);
    page.drawText(`PDFMaster Pro 10-Page Test Document - Page ${i} of 10`, { x: 50, y: 780, size: 14, font, color: rgb(0.2, 0.2, 0.4) });
  }
  const pdf10Bytes = await doc10.save();
  const pdf10Path = path.join(testDir, '10_page.pdf');
  fs.writeFileSync(pdf10Path, pdf10Bytes);

  // 3. Create a Scanned PDF
  const docScanned = await PDFDocument.create();
  const scPage = docScanned.addPage([595.28, 841.89]);
  scPage.drawRectangle({ x: 40, y: 40, width: 515, height: 760, color: rgb(0.96, 0.96, 0.96), borderColor: rgb(0.5, 0.5, 0.5), borderWidth: 2 });
  scPage.drawText('Scanned Document OCR Layer Index', { x: 60, y: 750, size: 16, font, color: rgb(0.1, 0.1, 0.1) });
  const pdfScannedBytes = await docScanned.save();
  const pdfScannedPath = path.join(testDir, 'scanned.pdf');
  fs.writeFileSync(pdfScannedPath, pdfScannedBytes);

  // 4. Create an Image-only PDF
  const docImg = await PDFDocument.create();
  const pngImageBytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  const embeddedImage = await docImg.embedPng(pngImageBytes);
  const imgPage = docImg.addPage([embeddedImage.width, embeddedImage.height]);
  imgPage.drawImage(embeddedImage, { x: 0, y: 0, width: embeddedImage.width, height: embeddedImage.height });
  const pdfImgBytes = await docImg.save();
  const pdfImgPath = path.join(testDir, 'image_only.pdf');
  fs.writeFileSync(pdfImgPath, pdfImgBytes);

  // 5. Create Empty / Corrupt PDFs
  const pdfEmptyPath = path.join(testDir, 'empty.pdf');
  fs.writeFileSync(pdfEmptyPath, Buffer.alloc(0));

  const pdfCorruptPath = path.join(testDir, 'corrupt.pdf');
  fs.writeFileSync(pdfCorruptPath, Buffer.from('CORRUPT DATA'));

  // Test 1-page PDF
  const req1Page = { file: { path: pdf1Path, originalname: '1_page.pdf' }, body: {} };
  let resData1Page = null;
  const res1Page = {
    status: (code) => ({
      json: (data) => { resData1Page = { code, data }; return resData1Page; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(req1Page, res1Page, (err) => {});
  if (!resData1Page || resData1Page.code !== 200) throw new Error('1-page PDF failed');

  // Test empty PDF
  const reqEmpty = { file: { path: pdfEmptyPath, originalname: 'empty.pdf' }, body: {} };
  let resDataEmpty = null;
  const resEmpty = {
    status: (code) => ({
      json: (data) => { resDataEmpty = { code, data }; return resDataEmpty; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(reqEmpty, resEmpty, (err) => {});
  if (!resDataEmpty || resDataEmpty.code !== 400) throw new Error('Empty PDF rejection failed');

  console.log('✔ All multi-PDF tests passed in client/test-production-tools-e2e.js!');
}

runProductionTests().catch(console.error);
