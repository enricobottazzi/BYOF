const { ethers } = require('hardhat');

async function deploy(signer4) {
  
    const GM = await hre.ethers.getContractFactory("GM");
    const gm = await GM.connect(signer4).deploy();
    await gm.deployed();
    console.log("GM contract deployed to:", gm.address);

    return gm 
  }

module.exports = deploy;
