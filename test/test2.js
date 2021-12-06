const { assert } = require("chai");
const { ethers } = require("hardhat");
var CryptoJS = require("crypto-js");
var IPFS = require ('ipfs-core');


describe("NFT minting", () => {
    let owner, ownerAddress, friend, friendAddress, deployer
    let gang = []
    let cid
    let map = new Map();
    let gm 
  
    before(async () => {
      owner = await ethers.provider.getSigner(0);
      ownerAddress = await owner.getAddress();
      friend = await ethers.provider.getSigner(1);
      friendAddress = await friend.getAddress();
      deployer = await ethers.provider.getSigner(2);
      // add friend to the gang

          message = `I am ${await owner.getAddress()} and I want to add you to my gang`
          signature = await friend.signMessage(message);
          signerAddress = await ethers.utils.verifyMessage(message, signature);
          if (signerAddress == friendAddress){
            gang.push(friendAddress);
          }

      // encrypt the gang and upload it to ipfs
      secretKey = `1234`
      ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(gang), secretKey).toString();
      ipfs = await IPFS.create()
      obj = await ipfs.add(ciphertext);
      cid = obj.path;

       // update the internal mapping that keeps track of every owner and its CID
      map.set(ownerAddress, cid);

      // let deployer deploy the NFT
      GM = await hre.ethers.getContractFactory("GM");
      gm = await GM.connect(deployer).deploy();
      await gm.deployed();
      console.log("GM contract deployed to:", gm.address, "with owner", await gm.owner());
    });

    it("should now allow owner to mint the nft", async () => {

      // he is not the deployer of the contract so he cannot mint NFT
      address = ownerAddress;
      if (map.get(address) != null) {
        const tokenURI = `https://gateway.ipfs.io/ipfs/${map.get(address)}`
        const tx = await gm.connect(owner).awardItem(address, tokenURI);

      // tx reverted, how can i test that??  
      assert.equal(await gm.tokenURI(tokenId) , tokenURI);
      }
    });

  
   it("should mint the nft to the owner if done by the deployer", async () => {
      address = ownerAddress;
      if (map.get(address) != null) {
        const tokenURI = `https://gateway.ipfs.io/ipfs/${map.get(address)}`
        const tx = await gm.connect(deployer).awardItem(address, tokenURI);
        const receipt = await tx.wait();
      // retrieve token ID of the new minted NFT
      let abi = [ "event MintedToken (address indexed _owner, uint indexed _tokenID)" ];
      let iface = new ethers.utils.Interface(abi);
      let topics = receipt.logs[1].topics
      let data = receipt.logs[1].data    
      const myLogs = await iface.decodeEventLog("MintedToken", data, topics);
      const tokenId = myLogs[1]
      console.log("new nft minted to:", address, "with tokenId", tokenId)
      assert.equal(await gm.tokenURI(tokenId) , tokenURI);
      }
    });
  
    it("the deployer should not be able to mint the NFT to someone else", async () => {
  
      address = friendAddress
  
      if (map.get(address) != null) {
        const tokenURI = `https://gateway.ipfs.io/ipfs/${map.get(address)}`
        const tx = await gm.awardItem(address, tokenURI);
        const receipt = await tx.wait();
        // retrieve token ID of the new minted NFT
        let abi = [ "event MintedToken (address indexed _owner, uint indexed _tokenID)" ];
        let iface = new ethers.utils.Interface(abi);
        let topics = receipt.logs[1].topics
        let data = receipt.logs[1].data    
        const myLogs = await iface.decodeEventLog("MintedToken", data, topics);
        const tokenId = myLogs[1]
        console.log("new nft minted to:", address, "with tokenId", tokenId)
        assert.equal(await gm.tokenURI(tokenId) , tokenURI);
        }
  
      else {
        console.log("you have not created your list of contacts yet");
        assert.equal(0, await gm.balanceOf(address));
      }
    });
  
  });
  

  
  
  