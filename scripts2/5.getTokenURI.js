const hre = require("hardhat");

async function getTokenURI() {

  contractAddress = "0x966AD7326743D9F45745BC0D42e78a04249976D4";

  const gm = await hre.ethers.getContractAt("GM", contractAddress);

  const metaData = await gm.tokenURI(1);

  console.log(metaData);

  return metaData;
}

module.exports = getTokenURI;

