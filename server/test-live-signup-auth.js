const https = require('https');

function makePost(path, bodyObj) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(bodyObj);
    const req = https.request({
      hostname: 'pdf-master-pro-chi.vercel.app',
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runLiveTests() {
  console.log("==================================================");
  console.log("PDFMaster Pro - Live Production API QA Test Suite");
  console.log("Domain: https://pdf-master-pro-chi.vercel.app");
  console.log("==================================================\n");

  const testEmail = `testuser_${Date.now()}@example.com`;

  // 1. Test Registration
  console.log(`[TEST 1] Registering User: ${testEmail}...`);
  const regRes = await makePost('/api/auth/register', {
    name: 'Production QA User',
    email: testEmail,
    password: 'Password123!'
  });
  console.log(`Status: ${regRes.statusCode}`);
  console.log(`Response: ${regRes.body}\n`);

  // 2. Test Login Bad Password
  console.log(`[TEST 2] Testing Login with Bad Password...`);
  const badLoginRes = await makePost('/api/auth/login', {
    email: testEmail,
    password: 'WrongPassword'
  });
  console.log(`Status: ${badLoginRes.statusCode} (Expected 401)`);
  console.log(`Response: ${badLoginRes.body}\n`);

  // 3. Test Login Valid Password (OTP Generation)
  console.log(`[TEST 3] Testing Login with Valid Password...`);
  const validLoginRes = await makePost('/api/auth/login', {
    email: testEmail,
    password: 'Password123!'
  });
  console.log(`Status: ${validLoginRes.statusCode} (Expected 200)`);
  console.log(`Response: ${validLoginRes.body}\n`);

  // 4. Test Verification of Invalid OTP
  console.log(`[TEST 4] Testing Invalid OTP Verification...`);
  const invalidOtpRes = await makePost('/api/auth/verify-otp', {
    email: testEmail,
    otp: '000000'
  });
  console.log(`Status: ${invalidOtpRes.statusCode} (Expected 400)`);
  console.log(`Response: ${invalidOtpRes.body}\n`);

  console.log("==================================================");
  console.log("Live Production API QA Execution Finished.");
  console.log("==================================================");
}

runLiveTests().catch(console.error);
