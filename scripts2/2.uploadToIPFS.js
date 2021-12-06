var IPFS = require ('ipfs-core');
var scramble = require('./1.encrypt.js'); 
let map = new Map();
const { ethers } = require('hardhat');

async function upload () {

const owner = await ethers.provider.getSigner(0);
const ownerAdd = await owner.getAddress();

// Upload the ciphertext to IPFS
const ciphertext = await scramble();
const ipfs = await IPFS.create()
const { cid } = await ipfs.add(ciphertext);
console.log("encrypted file uploaded to IPFS cid =>" , cid, "of address", ownerAdd);
return cid
}

async function getMapping () {
const cid = await upload();
const owner = await ethers.provider.getSigner(0);
const ownerAdd = await owner.getAddress();

// create a map that associates for every owner the CID of their encrypted friends list
map.set(ownerAdd, cid);
return map;
}

module.exports = getMapping;
