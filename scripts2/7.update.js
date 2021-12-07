const decrypt = require('./6.decrypt.js'); 
const updateGang = require ('./0.updateGang.js')
const encrypt = require('./1.encrypt.js')
const upload = require ('./3.uploadToIPFS.js')
const { ethers } = require('hardhat');


async function update (signer1, signer3, contractAddress, _tokenID, secretKey, ipfs) {

    //1. retrieve gang by calling decrypt
    const gang = await decrypt (contractAddress, _tokenID, secretKey, ipfs)
    //2. update gang calling updateGang
    const updatedGang = await updateGang (signer1, signer3, gang);
    //3. encrypt gang calling encrypt 
    const ciphertext = await encrypt (updatedGang, secretKey)
    //4. upload it to IPFS 
    const cid = await upload (ciphertext, (await signer1.getAddress()), ipfs);
    //5. do the update manually
    const newTokenURI = `https://gateway.ipfs.io/ipfs/${cid}`
    const gm = await hre.ethers.getContractAt("GM", contractAddress);
    await gm.connect(signer1).updateTokenURI(_tokenID, newTokenURI);   
    console.log("NFT ID", _tokenID, "updated");
}

module.exports = update;