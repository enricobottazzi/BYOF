const { assert } = require("chai");
const { ethers } = require("hardhat");
var CryptoJS = require("crypto-js");
var IPFS = require ('ipfs-core');

  
  describe("other NFT stuff", () => {
    let owner, ownerAddress, friend , friendAddress, newFriend, newFriendAddress
    let signature
    let message
    let gang = []
    let secretKey
    let cid
    let map = new Map();
    let gm 
    let ipfs 
    let tokenURI
    let tokenId
  
    before(async () => {
      owner = await ethers.provider.getSigner(0);
      ownerAddress = await owner.getAddress();
      friend = await ethers.provider.getSigner(1);
      friendAddress = await friend.getAddress();
      newFriend = await ethers.provider.getSigner(2);
      newFriendAddress = await newFriend.getAddress();
      deployer = await ethers.provider.getSigner(3);

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

      // deploy the contract, it is done by the deployer
      GM = await hre.ethers.getContractFactory("GM");
      gm = await GM.connect(deployer).deploy();
      await gm.deployed();
      console.log("GM contract deployed to:", gm.address, "with owner", await gm.owner());
      // mint an nft to owner 
      tokenURI = `https://gateway.ipfs.io/ipfs/${map.get(ownerAddress)}`
      const tx = await gm.connect(deployer).awardItem(ownerAddress, tokenURI);
      const receipt = await tx.wait();
      // retrieve token ID of the new minted NFT
      let abi = [ "event MintedToken (address indexed _owner, uint indexed _tokenID)" ];
      let iface = new ethers.utils.Interface(abi);
      let topics = receipt.logs[1].topics
      let data = receipt.logs[1].data    
      const myLogs = await iface.decodeEventLog("MintedToken", data, topics);
      tokenId = myLogs[1]
    });
  
    it("should decrypt the CID and match it with the original GANG array", async () => {
      const cid = tokenURI.split('/').reverse()[0];  
      const stream = ipfs.cat(cid);
      let data = '';
      for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      data += chunk.toString()
      }
      var bytes  = CryptoJS.AES.decrypt(data, secretKey);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
      assert.strictEqual(gang[0], decryptedData[0]);
    });
  
  
    it("should allow the NFT owner to add a friend to its list and update the NFT", async () => {
        // add new friend to the gang
        let message = `I am ${ownerAddress} and I want to add you to my gang`    
        signature = await newFriend.signMessage(message);
        signerAddress = await ethers.utils.verifyMessage(message, signature);
        if (signerAddress == newFriendAddress){
          gang.push(newFriendAddress);
        }
      
        console.log(await gm.balanceOf(await owner.getAddress()))
        // Encrypt the list 
        var ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(gang), secretKey).toString();
     
        // add it to IPFS
        const obj = await ipfs.add(ciphertext);
        cid = obj.path;

        // // update the mapping 
        map.set(ownerAddress, cid);

        // update the NFT 

        const newTokenURI = `https://gateway.ipfs.io/ipfs/${await map.get(ownerAddress)}`
        await gm.connect(owner).updateTokenURI(tokenId, newTokenURI);        
        assert.equal(await gm.tokenURI(tokenId) , newTokenURI);
    });


    it("shouldn't allow someone else to modify owners' list of friend", async () => {
        newCid = "aaaaaa"
        // update the NFT 
        await gm.connect(friend).updateTokenURI(tokenId, newCid); 
        // even it it is reverted it is successful because the transcation has been reverted! 
        assert.equal(await gm.tokenURI(tokenId) , cid);
    });

    it("shouldn't allow the owner to transfer the NFT", async () => {
     await gm.connect(owner).transferFrom(ownerAddress, friendAddress, tokenId);
     console.log(await gm.balanceOf(ownerAddress))
     assert.equal(0, await gm.balanceOf(friendAddress));


     // check this out!
    });
  
  })
  