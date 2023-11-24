// helpers/referralCodeGenerator.js
const { randomBytes } = require('crypto');
const { promisify } = require('util');
//const ReferralCodes = require('../models/referralCodes');
// helpers/referralCodeGenerator.js
const ReferralCodes = require('../models').ReferralCodes;


const randomBytesAsync = promisify(randomBytes);

async function generateUniqueReferralCode() {
  let code;
  do {
    // Membuat buffer random bytes dan mengonversinya menjadi string hexadecimal
    const buffer = await randomBytesAsync(4); // Sesuaikan panjang bytes sesuai kebutuhan
    code = buffer.toString('hex').toUpperCase();

    // Memeriksa apakah kode sudah ada
    const existingCode = await ReferralCodes.findOne({ where: { code: code } });
    if (!existingCode) {
      break;
    }
  } while (true);

  return code;
}

module.exports = generateUniqueReferralCode;



