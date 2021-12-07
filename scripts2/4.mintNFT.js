const { ethers } = require('hardhat');
const encrypt = require('./1.encrypt.js')
const upload = require('./3.uploadToIPFS.js')

async function mintNFT(contractAddress, owner, secretKey, gang, ipfs) {

    const ciphertext = await encrypt (gang, secretKey);

    ownerAdd = await owner.getAddress();
    const gm = await hre.ethers.getContractAt("GM", contractAddress);
    
    const cid = await upload(ciphertext, ownerAdd, ipfs);
    const tokenURI = `https://gateway.ipfs.io/ipfs/${cid}`
    const tx = await gm.connect(owner).awardItem(ownerAdd, tokenURI);
    const receipt = await tx.wait();
    // retrieve the token ID
    const evt = receipt.events.find(x => x.event === "MintedToken");
    const {_tokenID} = evt.args;

    return _tokenID;
}


module.exports = mintNFT;

