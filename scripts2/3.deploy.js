const { ethers } = require('hardhat');

async function deploy() {
  
    const GM = await hre.ethers.getContractFactory("GM");
    const gm = await GM.deploy();
  
    await gm.deployed();
  
    console.log("GM contract deployed to:", gm.address);

  }

deploy();