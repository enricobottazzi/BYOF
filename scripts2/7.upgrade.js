const decrypt = require('./6.decrypt.js'); 
const getMapping = require('./2.uploadToIPFS.js'); 
var CryptoJS = require("crypto-js");
const { ethers } = require('hardhat');

let secretKey;
let contractAddress;
let tokenId


async function main () {

const owner = await ethers.provider.getSigner(0); 
const ownerAdd = await owner.getAddress();

const newFriend = await ethers.provider.getSigner(1);
const newFriendAddress = await newFriend.getAddress();
  
// retrieve the array of your gang
const gang = await decrypt();

// add a new friend to the array
    // ask for a singature from the friend that you want to add
    let message = `I am ${ownerAdd} and I want to add you to my gang`    
    signature = await newFriend.signMessage(message);
    console.log(signature);
    console.log(`${await newFriend.getAddress()} is now part of ${await owner.getAddress()} gang`);
    gang.push("newFriendAddress");

// Validate the signature 
const signerAddress = await ethers.utils.verifyMessage(message, signature);
if (signerAddress == newFriendAddress) {
    // if valid, Encrypt the list 
    var ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(gang), secretKey).toString();
    console.log ("signature succesfully verified!")
    console.log("your encrypted message is :", ciphertext)
}

else console.log ("wrong signature provided!")

// upload it to IPFS again
const ipfs = await IPFS.create()
const { cid } = await ipfs.add(ciphertext);
console.log("encrypted file uploaded to IPFS cid =>" , cid, "of address", ownerAdd);

// update the mapping 
map = await getMapping();
console.log(map);
map.set(ownerAdd, cid);
console.log(map);


// update the NFT
// The update will fail if .upgradeTokenURI is called from someone who is not the owner of that particular NFT 
    const tokenURI = `https://gateway.ipfs.io/ipfs/${map.get(ownerAdd)}`
    const gm = await hre.ethers.getContractAt("GM", contractAddress);
    await gm.updateTokenURI(tokenId, newTokenURI);        
    console.log("NFT ID", tokenId, "updated");

}

main()