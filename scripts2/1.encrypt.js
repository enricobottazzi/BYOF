var CryptoJS = require("crypto-js");
const { ethers } = require('hardhat');
var createGang = require('./0.createGang.js'); 

let signature;
let message;
let friendAddress;
let secretKey;

async function scramble () {

let gang = await createGang();

// Validate the signature 
const signerAddress = await ethers.utils.verifyMessage(message, signature);

if (signerAddress == friendAddress) {
    // if valid, Encrypt the list 
    var ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(gang), secretKey).toString();
    console.log ("signature succesfully verified!")
    console.log("your encrypted message is :", ciphertext)

    return ciphertext;
}
    else console.log ("wrong signature provided!")
};

scramble();

module.exports = scramble;