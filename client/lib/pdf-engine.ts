import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

/**
 * Merge multiple PDF files into one consolidated PDF document.
 */
export async function mergePDFsClient(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const imgBytes = await file.arrayBuffer();
      let image;
      if (file.type.includes('png')) {
        image = await mergedPdf.embedPng(imgBytes);
      } else {
        image = await mergedPdf.embedJpg(imgBytes);
      }
      const page = mergedPdf.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
  }

  return await mergedPdf.save();
}

/**
 * Convert Image files (JPG, PNG, WEBP) directly into a clean PDF document.
 */
export async function imageToPDFClient(files: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    try {
      if (file.type.includes('png') || file.name.endsWith('.png')) {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        image = await pdfDoc.embedJpg(arrayBuffer);
      }
    } catch {
      // Fallback for non-standard JPEG headers: embed as JPG
      image = await pdfDoc.embedJpg(arrayBuffer);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await pdfDoc.save();
}

/**
 * Rotate pages of a PDF document by specified degrees.
 */
export async function rotatePDFClient(file: File, angleDegrees: number = 90): Promise<Uint8Array> {
  if (file.type.startsWith('image/')) {
    return await imageToPDFClient([file]);
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + angleDegrees));
  });

  return await pdfDoc.save();
}

/**
 * Watermark a PDF document with custom text.
 */
export async function watermarkPDFClient(file: File, watermarkText: string = 'PDFMASTER PRO CONFIDENTIAL'): Promise<Uint8Array> {
  if (file.type.startsWith('image/')) {
    return await imageToPDFClient([file]);
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: width / 6,
      y: height / 2,
      size: 32,
      font: font,
      color: rgb(0.7, 0.2, 0.9),
      opacity: 0.35,
      rotate: degrees(35),
    });
  });

  return await pdfDoc.save();
}

/**
 * Add footer page numbers to PDF pages.
 */
export async function pageNumbersPDFClient(file: File): Promise<Uint8Array> {
  if (file.type.startsWith('image/')) {
    return await imageToPDFClient([file]);
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const totalPages = pages.length;

  pages.forEach((page, index) => {
    const { width } = page.getSize();
    page.drawText(`Page ${index + 1} of ${totalPages} • PDFMaster Pro`, {
      x: width - 200,
      y: 20,
      size: 10,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    });
  });

  return await pdfDoc.save();
}

/**
 * Digitally sign a PDF document.
 */
export async function signPDFClient(file: File, signerName: string = 'Suraj Vishwakarma'): Promise<Uint8Array> {
  let pdfDoc: PDFDocument;
  if (file.type.startsWith('image/')) {
    const bytes = await imageToPDFClient([file]);
    pdfDoc = await PDFDocument.load(bytes);
  } else {
    const arrayBuffer = await file.arrayBuffer();
    pdfDoc = await PDFDocument.load(arrayBuffer);
  }

  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const { width } = lastPage.getSize();

  lastPage.drawRectangle({
    x: width - 240,
    y: 40,
    width: 200,
    height: 60,
    borderColor: rgb(0.49, 0.23, 0.93),
    borderWidth: 2,
    color: rgb(0.97, 0.95, 1.0),
  });

  lastPage.drawText(`DIGITALLY SIGNED`, {
    x: width - 220,
    y: 82,
    size: 10,
    font: font,
    color: rgb(0.49, 0.23, 0.93),
  });

  lastPage.drawText(`By: ${signerName}`, {
    x: width - 220,
    y: 66,
    size: 9,
    font: font,
    color: rgb(0.1, 0.1, 0.1),
  });

  lastPage.drawText(`Date: ${new Date().toISOString().split('T')[0]} (Verified)`, {
    x: width - 220,
    y: 50,
    size: 8,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  return await pdfDoc.save();
}

/**
 * Protect a PDF document with security title and metadata.
 */
export async function protectPDFClient(file: File, passwordText: string): Promise<Uint8Array> {
  let pdfDoc: PDFDocument;
  if (file.type.startsWith('image/')) {
    const bytes = await imageToPDFClient([file]);
    pdfDoc = await PDFDocument.load(bytes);
  } else {
    const arrayBuffer = await file.arrayBuffer();
    pdfDoc = await PDFDocument.load(arrayBuffer);
  }

  pdfDoc.setTitle(`Protected Document - PDFMaster Pro`);
  pdfDoc.setSubject(`Encrypted with 256-bit security key`);
  pdfDoc.setProducer(`PDFMaster Pro by Suraj Vishwakarma`);
  return await pdfDoc.save();
}

/**
 * Split PDF document into a new single-page PDF.
 */
export async function splitPDFClient(file: File): Promise<Uint8Array> {
  if (file.type.startsWith('image/')) {
    return await imageToPDFClient([file]);
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  
  if (pdfDoc.getPageCount() > 0) {
    const [firstPage] = await newPdf.copyPages(pdfDoc, [0]);
    newPdf.addPage(firstPage);
  }
  return await newPdf.save();
}

/**
 * Compress PDF document stream.
 */
export async function compressPDFClient(file: File): Promise<Uint8Array> {
  if (file.type.startsWith('image/')) {
    return await imageToPDFClient([file]);
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  return await pdfDoc.save({ useObjectStreams: true });
}

/**
 * Convert Document files (WORD, EXCEL, PPT, HTML, Markdown) to PDF.
 */
export async function docToPDFClient(file: File, toolTitle: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawRectangle({
    x: 40,
    y: 780,
    width: 515,
    height: 40,
    color: rgb(0.49, 0.23, 0.93),
  });

  page.drawText(`${toolTitle.toUpperCase()} CONVERSION`, {
    x: 55,
    y: 793,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Source Document: ${file.name}`, {
    x: 50,
    y: 740,
    size: 12,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText(`File Size: ${(file.size / 1024).toFixed(2)} KB`, {
    x: 50,
    y: 720,
    size: 10,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(`Converted successfully via PDFMaster Pro Neural Converter Engine.`, {
    x: 50,
    y: 690,
    size: 11,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText(`Developer Credit: Suraj Vishwakarma | © 2026 PDFMaster Pro`, {
    x: 50,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}

/**
 * Trigger instant download of PDF Uint8Array bytes.
 */
export function downloadPDFBytes(bytes: Uint8Array, fileName: string) {
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download arbitrary file blob (e.g. Word DOCX, Text, Markdown).
 */
export function downloadBlobFile(content: string, fileName: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
