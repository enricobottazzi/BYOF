const getMapping = require('./2.uploadToIPFS.js'); 
const { ethers } = require('hardhat');

let contractAddress;

async function main() {

  map = await getMapping();

  // get existing contract
  const gm = await hre.ethers.getContractAt("GM", contractAddress);
  const owner = await ethers.provider.getSigner(0);
  const ownerAdd = await owner.getAddress();
  
  // check if the address is part of the map
  // if so, mint an NFT to that address
  if (map.get(ownerAdd) != null) {

    const tokenURI = `https://gateway.ipfs.io/ipfs/${map.get(ownerAdd)}`

    const tx = await gm.awardItem(ownerAdd, tokenURI);
    const receipt = await tx.wait();

    // retrieve token ID of the new minted NFT
    let abi = [ "event MintedToken (address indexed _owner, uint indexed _tokenID)" ];
    let iface = new ethers.utils.Interface(abi);
    let topics = receipt.logs[1].topics
    let data = receipt.logs[1].data    
    const myLogs = await iface.decodeEventLog("MintedToken", data, topics);
    const tokenId = myLogs[1]

    console.log("new nft minted to:", ownerAdd, "with tokenId", tokenId)
  }

  else {console.log ("you have not created your list of contacts yet")}

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });