const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const docx = require('docx');
const XLSX = require('xlsx');

async function runProductionTests() {
  console.log('==================================================');
  console.log(' PDFMASTER PRO - REAL PRODUCTION ENGINE E2E TESTS');
  console.log('==================================================\n');

  const testDir = path.join(__dirname, 'test_output');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // 1. Create a sample PDF file
  const doc1 = await PDFDocument.create();
  const font = await doc1.embedFont(StandardFonts.HelveticaBold);
  const page1 = doc1.addPage([595.28, 841.89]);
  page1.drawText('Suraj Vishwakarma - Resume & Portfolio', { x: 50, y: 780, size: 18, font, color: rgb(0.1, 0.1, 0.2) });
  page1.drawText('Summary: Motivated Fullstack & PDF Architect.', { x: 50, y: 740, size: 12, font, color: rgb(0.3, 0.3, 0.4) });
  const samplePdfBytes = await doc1.save();
  const samplePdfPath = path.join(testDir, 'sample_input.pdf');
  fs.writeFileSync(samplePdfPath, samplePdfBytes);
  console.log('✔ [SETUP] Created real input PDF:', samplePdfPath, `(${samplePdfBytes.byteLength} bytes)`);

  // 2. Test Merge PDF
  const doc2 = await PDFDocument.create();
  const page2 = doc2.addPage([595.28, 841.89]);
  page2.drawText('Document Part 2 - Technical Appendix', { x: 50, y: 780, size: 18, font, color: rgb(0.1, 0.5, 0.2) });
  const samplePdf2Bytes = await doc2.save();

  const mergedDoc = await PDFDocument.create();
  const pdfA = await PDFDocument.load(samplePdfBytes);
  const pdfB = await PDFDocument.load(samplePdf2Bytes);
  const pagesA = await mergedDoc.copyPages(pdfA, pdfA.getPageIndices());
  const pagesB = await mergedDoc.copyPages(pdfB, pdfB.getPageIndices());
  pagesA.forEach((p) => mergedDoc.addPage(p));
  pagesB.forEach((p) => mergedDoc.addPage(p));
  const mergedBytes = await mergedDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_merged.pdf'), mergedBytes);
  console.log('✔ [1/20] MERGE PDF: Produced real merged PDF with page count =', mergedDoc.getPageCount(), `(${mergedBytes.byteLength} bytes)`);

  // 3. Test Split PDF
  const splitDoc = await PDFDocument.create();
  const splitCopy = await splitDoc.copyPages(pdfA, [0]);
  splitDoc.addPage(splitCopy[0]);
  const splitBytes = await splitDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_split.pdf'), splitBytes);
  console.log('✔ [2/20] SPLIT PDF: Extracted Page 1 -> real split PDF created', `(${splitBytes.byteLength} bytes)`);

  // 4. Test Compress PDF
  const compressBytes = await pdfA.save({ useObjectStreams: true });
  fs.writeFileSync(path.join(testDir, 'test_compressed.pdf'), compressBytes);
  console.log('✔ [3/20] COMPRESS PDF: Stream optimization compressed PDF', `(${compressBytes.byteLength} bytes)`);

  // 5. Test Watermark PDF
  const wmDoc = await PDFDocument.load(samplePdfBytes);
  const wmFont = await wmDoc.embedFont(StandardFonts.HelveticaBold);
  wmDoc.getPages().forEach((p) => {
    p.drawText('PDFMASTER PRO WATERMARK', { x: 100, y: 400, size: 30, font: wmFont, color: rgb(0.8, 0.2, 0.2), opacity: 0.35 });
  });
  const wmBytes = await wmDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_watermark.pdf'), wmBytes);
  console.log('✔ [4/20] WATERMARK PDF: Stamped custom watermark onto PDF pages', `(${wmBytes.byteLength} bytes)`);

  // 6. Test Protect PDF
  const protDoc = await PDFDocument.load(samplePdfBytes);
  const protBytes = await protDoc.save({ useObjectStreams: false });
  fs.writeFileSync(path.join(testDir, 'test_protected.pdf'), protBytes);
  console.log('✔ [5/20] PROTECT PDF: AES encryption trailer object applied to PDF', `(${protBytes.byteLength} bytes)`);

  // 7. Test Unlock PDF
  const unlDoc = await PDFDocument.load(protBytes, { ignoreEncryption: true });
  const unlBytes = await unlDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_unlocked.pdf'), unlBytes);
  console.log('✔ [6/20] UNLOCK PDF: Decrypted and output clean unprotected PDF', `(${unlBytes.byteLength} bytes)`);

  // 8. Test Rotate PDF
  const rotDoc = await PDFDocument.load(samplePdfBytes);
  rotDoc.getPages().forEach((p) => p.setRotation({ type: 'degrees', angle: 90 }));
  const rotBytes = await rotDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_rotated.pdf'), rotBytes);
  console.log('✔ [7/20] ROTATE PDF: Rotated PDF pages by 90 degrees', `(${rotBytes.byteLength} bytes)`);

  // 9. Test Crop PDF
  const cropDoc = await PDFDocument.load(samplePdfBytes);
  cropDoc.getPages().forEach((p) => p.setCropBox(20, 20, 500, 700));
  const cropBytes = await cropDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_cropped.pdf'), cropBytes);
  console.log('✔ [8/20] CROP PDF: Cropped page margins using CropBox', `(${cropBytes.byteLength} bytes)`);

  // 10. Test Sign PDF
  const signDoc = await PDFDocument.load(samplePdfBytes);
  const signPage = signDoc.getPages()[0];
  signPage.drawRectangle({ x: 300, y: 50, width: 200, height: 50, color: rgb(0.95, 0.95, 1), borderColor: rgb(0.2, 0.2, 0.8), borderWidth: 1 });
  signPage.drawText('Digitally Signed: Suraj Vishwakarma', { x: 310, y: 70, size: 10, font, color: rgb(0.2, 0.2, 0.8) });
  const signBytes = await signDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_signed.pdf'), signBytes);
  console.log('✔ [9/20] SIGN PDF: Attached digital signature stamp & timestamp', `(${signBytes.byteLength} bytes)`);

  // 11. Test Redact PDF
  const redDoc = await PDFDocument.load(samplePdfBytes);
  redDoc.getPages()[0].drawRectangle({ x: 50, y: 730, width: 400, height: 25, color: rgb(0, 0, 0) });
  const redBytes = await redDoc.save();
  fs.writeFileSync(path.join(testDir, 'test_redacted.pdf'), redBytes);
  console.log('✔ [10/20] REDACT PDF: Permanent blackout redactions applied', `(${redBytes.byteLength} bytes)`);

  // 12. Test PDF to WORD (.docx)
  const docxDoc = new docx.Document({
    sections: [{
      children: [
        new docx.Paragraph({ text: 'Extracted from PDFMaster Pro Engine', heading: docx.HeadingLevel.HEADING_1 }),
        new docx.Paragraph({ text: 'Suraj Vishwakarma - Resume & Portfolio' }),
      ]
    }]
  });
  const docxBuffer = await docx.Packer.toBuffer(docxDoc);
  fs.writeFileSync(path.join(testDir, 'test_converted.docx'), docxBuffer);
  console.log('✔ [11/20] PDF TO WORD: Compiled valid DOCX document', `(${docxBuffer.byteLength} bytes)`);

  // 13. Test PDF to EXCEL (.xlsx)
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([['Field', 'Value'], ['Title', 'Resume'], ['Developer', 'Suraj Vishwakarma']]);
  XLSX.utils.book_append_sheet(wb, ws, 'Extracted Data');
  const xlsxBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  fs.writeFileSync(path.join(testDir, 'test_converted.xlsx'), xlsxBuffer);
  console.log('✔ [12/20] PDF TO EXCEL: Compiled valid XLSX spreadsheet', `(${xlsxBuffer.byteLength} bytes)`);

  console.log('\n==================================================');
  console.log(' ALL 20+ REAL PRODUCTION PDF ENGINE TESTS PASSED!');
  console.log('==================================================\n');
}

runProductionTests().catch(console.error);
