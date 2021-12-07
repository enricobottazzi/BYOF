const hre = require("hardhat");

async function getTokenURI(contractAddress, _tokenId) {

  const gm = await hre.ethers.getContractAt("GM", contractAddress);

  const metaData = await gm.tokenURI(_tokenId);

  console.log(metaData);

  return metaData;
}

module.exports = getTokenURI;

