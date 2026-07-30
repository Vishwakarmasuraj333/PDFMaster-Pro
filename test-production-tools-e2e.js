const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const docx = require('docx');
const XLSX = require('xlsx');

// Import server validation helper to verify backend pipeline logic
const pdfController = require('./server/controllers/pdfController');

async function runProductionTests() {
  console.log('==================================================');
  console.log(' PDFMASTER PRO - PRODUCTION BUG FIX & PDF SUITE E2E');
  console.log('==================================================\n');

  const testDir = path.join(__dirname, 'test_output');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // ----------------------------------------------------
  // REQUIREMENT 8: TEST USING MULTIPLE REAL PDFS
  // ----------------------------------------------------

  // 1. Create a 1-page PDF
  const doc1 = await PDFDocument.create();
  const font = await doc1.embedFont(StandardFonts.HelveticaBold);
  const p1 = doc1.addPage([595.28, 841.89]);
  p1.drawText('PDFMaster Pro 1-Page Test Document', { x: 50, y: 780, size: 18, font, color: rgb(0.1, 0.1, 0.2) });
  const pdf1Bytes = await doc1.save();
  const pdf1Path = path.join(testDir, '1_page.pdf');
  fs.writeFileSync(pdf1Path, pdf1Bytes);
  console.log('✔ [SETUP] Created 1-page PDF:', pdf1Path, `(${pdf1Bytes.byteLength} bytes)`);

  // 2. Create a 10-page PDF
  const doc10 = await PDFDocument.create();
  for (let i = 1; i <= 10; i++) {
    const page = doc10.addPage([595.28, 841.89]);
    page.drawText(`PDFMaster Pro 10-Page Test Document - Page ${i} of 10`, { x: 50, y: 780, size: 14, font, color: rgb(0.2, 0.2, 0.4) });
  }
  const pdf10Bytes = await doc10.save();
  const pdf10Path = path.join(testDir, '10_page.pdf');
  fs.writeFileSync(pdf10Path, pdf10Bytes);
  console.log('✔ [SETUP] Created 10-page PDF:', pdf10Path, `(${pdf10Bytes.byteLength} bytes)`);

  // 3. Create a Scanned PDF (vector & text overlay layout)
  const docScanned = await PDFDocument.create();
  const scPage = docScanned.addPage([595.28, 841.89]);
  scPage.drawRectangle({ x: 40, y: 40, width: 515, height: 760, color: rgb(0.96, 0.96, 0.96), borderColor: rgb(0.5, 0.5, 0.5), borderWidth: 2 });
  scPage.drawText('Scanned Document OCR Layer Index', { x: 60, y: 750, size: 16, font, color: rgb(0.1, 0.1, 0.1) });
  const pdfScannedBytes = await docScanned.save();
  const pdfScannedPath = path.join(testDir, 'scanned.pdf');
  fs.writeFileSync(pdfScannedPath, pdfScannedBytes);
  console.log('✔ [SETUP] Created scanned PDF:', pdfScannedPath, `(${pdfScannedBytes.byteLength} bytes)`);

  // 4. Create an Image-only PDF (embedded PNG image stream)
  const docImg = await PDFDocument.create();
  const pngImageBytes = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  const embeddedImage = await docImg.embedPng(pngImageBytes);
  const imgPage = docImg.addPage([embeddedImage.width, embeddedImage.height]);
  imgPage.drawImage(embeddedImage, { x: 0, y: 0, width: embeddedImage.width, height: embeddedImage.height });
  const pdfImgBytes = await docImg.save();
  const pdfImgPath = path.join(testDir, 'image_only.pdf');
  fs.writeFileSync(pdfImgPath, pdfImgBytes);
  console.log('✔ [SETUP] Created image-only PDF:', pdfImgPath, `(${pdfImgBytes.byteLength} bytes)`);

  // 5. Create Empty / Corrupt PDFs
  const pdfEmptyPath = path.join(testDir, 'empty.pdf');
  fs.writeFileSync(pdfEmptyPath, Buffer.alloc(0)); // 0 bytes

  const pdfCorruptPath = path.join(testDir, 'corrupt.pdf');
  fs.writeFileSync(pdfCorruptPath, Buffer.from('THIS IS NOT A VALID PDF FILE HEADER DATA 12345'));
  console.log('✔ [SETUP] Created 0-byte PDF & corrupt PDF test files.');

  // ----------------------------------------------------
  // VERIFY VALIDATIONS & SERVER-SIDE LOGGING (REQ 1 - 6)
  // ----------------------------------------------------

  console.log('\n--- TESTING BACKEND VALIDATION & PIPELINE SANITY ---');

  // Test 1-page PDF processing
  const req1Page = { file: { path: pdf1Path, originalname: '1_page.pdf' }, body: {} };
  let resData1Page = null;
  const res1Page = {
    status: (code) => ({
      json: (data) => { resData1Page = { code, data }; return resData1Page; },
      send: (buf) => { resData1Page = { code, buf }; return resData1Page; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(req1Page, res1Page, (err) => console.error(err));
  if (resData1Page && resData1Page.code === 200 && resData1Page.data.success) {
    console.log(`✔ [VALIDATION 1/5] 1-page PDF processed successfully: pageCount=${resData1Page.data.pageCount}`);
  } else {
    throw new Error('1-page PDF validation failed!');
  }

  // Test 10-page PDF processing
  const req10Page = { file: { path: pdf10Path, originalname: '10_page.pdf' }, body: {} };
  let resData10Page = null;
  const res10Page = {
    status: (code) => ({
      json: (data) => { resData10Page = { code, data }; return resData10Page; },
      send: (buf) => { resData10Page = { code, buf }; return resData10Page; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(req10Page, res10Page, (err) => console.error(err));
  if (resData10Page && resData10Page.code === 200 && resData10Page.data.pageCount === 10) {
    console.log(`✔ [VALIDATION 2/5] 10-page PDF processed successfully: pageCount=${resData10Page.data.pageCount}`);
  } else {
    throw new Error('10-page PDF validation failed!');
  }

  // Test scanned PDF processing
  const reqScanned = { file: { path: pdfScannedPath, originalname: 'scanned.pdf' }, body: {} };
  let resDataScanned = null;
  const resScanned = {
    status: (code) => ({
      json: (data) => { resDataScanned = { code, data }; return resDataScanned; },
      send: (buf) => { resDataScanned = { code, buf }; return resDataScanned; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(reqScanned, resScanned, (err) => console.error(err));
  if (resDataScanned && resDataScanned.code === 200) {
    console.log(`✔ [VALIDATION 3/5] Scanned PDF processed successfully: pageCount=${resDataScanned.data.pageCount}`);
  } else {
    throw new Error('Scanned PDF validation failed!');
  }

  // Test image-only PDF processing
  const reqImg = { file: { path: pdfImgPath, originalname: 'image_only.pdf' }, body: {} };
  let resDataImg = null;
  const resImg = {
    status: (code) => ({
      json: (data) => { resDataImg = { code, data }; return resDataImg; },
      send: (buf) => { resDataImg = { code, buf }; return resDataImg; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(reqImg, resImg, (err) => console.error(err));
  if (resDataImg && resDataImg.code === 200) {
    console.log(`✔ [VALIDATION 4/5] Image-only PDF processed successfully: pageCount=${resDataImg.data.pageCount}`);
  } else {
    throw new Error('Image-only PDF validation failed!');
  }

  // Test empty (0-byte) PDF -> REJECT WITH 400
  const reqEmpty = { file: { path: pdfEmptyPath, originalname: 'empty.pdf' }, body: {} };
  let resDataEmpty = null;
  const resEmpty = {
    status: (code) => ({
      json: (data) => { resDataEmpty = { code, data }; return resDataEmpty; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(reqEmpty, resEmpty, (err) => {});
  if (resDataEmpty && resDataEmpty.code === 400) {
    console.log(`✔ [VALIDATION REJECTION 5a] Empty (0-byte) PDF rejected cleanly with 400 Bad Request: "${resDataEmpty.data.message}"`);
  } else {
    throw new Error('Empty PDF was not rejected with 400!');
  }

  // Test corrupt PDF -> REJECT WITH 400
  const reqCorrupt = { file: { path: pdfCorruptPath, originalname: 'corrupt.pdf' }, body: {} };
  let resDataCorrupt = null;
  const resCorrupt = {
    status: (code) => ({
      json: (data) => { resDataCorrupt = { code, data }; return resDataCorrupt; }
    }),
    setHeader: () => {}
  };
  await pdfController.aiSummary(reqCorrupt, resCorrupt, (err) => {});
  if (resDataCorrupt && resDataCorrupt.code === 400) {
    console.log(`✔ [VALIDATION REJECTION 5b] Corrupt PDF rejected cleanly with 400 Bad Request: "${resDataCorrupt.data.message}"`);
  } else {
    throw new Error('Corrupt PDF was not rejected with 400!');
  }

  console.log('\n==================================================');
  console.log(' ALL MULTI-PDF UPLOAD & VALIDATION E2E TESTS PASSED!');
  console.log('==================================================\n');
}

runProductionTests().catch((err) => {
  console.error('❌ E2E TEST FAILURE:', err);
  process.exit(1);
});
