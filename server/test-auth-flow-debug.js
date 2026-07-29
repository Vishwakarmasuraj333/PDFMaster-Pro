const http = require('http');

async function testAuthFlow() {
  console.log("==================================================");
  console.log("PDFMaster Pro - Authentication Debug Verification ");
  console.log("==================================================");

  // Test 1: Bad Password -> Must return HTTP 401 & success: false
  const badLoginPayload = JSON.stringify({ email: 'itsurya9930@gmail.com', password: 'wrongpassword' });
  const req1 = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': badLoginPayload.length }
  }, (res1) => {
    let data = '';
    res1.on('data', chunk => data += chunk);
    res1.on('end', () => {
      console.log(`[TEST 1] Invalid Credentials Response Status: ${res1.statusCode} (Expected 401)`);
      console.log(`[TEST 1] Payload: ${data}`);
      if (res1.statusCode === 401 && data.includes('"success":false')) {
        console.log("✓ TEST 1 PASSED: Invalid credentials rejected with 401 Unauthorized.");
      } else {
        console.log("❌ TEST 1 FAILED!");
      }
    });
  });
  req1.write(badLoginPayload);
  req1.end();

  // Test 2: Valid Password -> Must return HTTP 200, success: true, Set-Cookie header with HttpOnly, Secure/SameSite=Lax
  setTimeout(() => {
    const validLoginPayload = JSON.stringify({ email: 'itsurya9930@gmail.com', password: 'bittu8097944' });
    const req2 = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': validLoginPayload.length }
    }, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => {
        console.log(`\n[TEST 2] Valid Credentials Response Status: ${res2.statusCode} (Expected 200)`);
        console.log(`[TEST 2] Set-Cookie Headers:`, res2.headers['set-cookie']);
        console.log(`[TEST 2] Payload: ${data}`);

        const hasCookies = res2.headers['set-cookie'] && res2.headers['set-cookie'].some(c => c.includes('accessToken'));
        if (res2.statusCode === 200 && data.includes('"success":true') && hasCookies) {
          console.log("✓ TEST 2 PASSED: Valid credentials authenticated, 200 OK returned, Set-Cookie present.");
        } else {
          console.log("❌ TEST 2 FAILED!");
        }
      });
    });
    req2.write(validLoginPayload);
    req2.end();
  }, 1000);
}

testAuthFlow().catch(console.error);
