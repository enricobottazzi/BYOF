var CryptoJS = require("crypto-js");

async function encrypt (gang, secretKey) {
// Encrypt the list 
    var ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(gang), secretKey).toString();
    console.log("your encrypted message is :", ciphertext)
    return ciphertext;
};


module.exports = encrypt;