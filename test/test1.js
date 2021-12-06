const { assert } = require("chai");
const { ethers } = require("hardhat");
var CryptoJS = require("crypto-js");
var IPFS = require ('ipfs-core');

describe("gangCreation", () => {
  let owner, friend, friendAddress, signature
  let message
  let gang = []

  beforeEach(async () => {
    owner = await ethers.provider.getSigner(0);
    friend = await ethers.provider.getSigner(1);
    friendAddress = await friend.getAddress();
    message = `I am ${await owner.getAddress()} and I want to add you to my gang`
    signature = await friend.signMessage(message);
  });

  it("if the message has been signed should add the signer to the gang", async () => {
    signerAddress = await ethers.utils.verifyMessage(message, signature);
    if (signerAddress == friendAddress){
      gang.push(friendAddress);
    }
    assert.equal(friendAddress, gang[0])
  });

  it("should not add another address that hasn't signed the message to the gang", async () => {
    let enemy = await ethers.provider.getSigner(2);
    let enemyAddress = await enemy.getAddress();

    signerAddress = await ethers.utils.verifyMessage(message, signature);
    if (signerAddress != enemyAddress) {
      console.log("you are not the message signer")
    }
    assert.equal(friendAddress, gang.pop());
});
});

describe("encrypt and uploadToIPFS", () => {
  let owner, ownerAddress, friend, friendAddress
  let message
  let gang = []
  let secretKey
  let cid
  let map = new Map();
  let ipfs 

  before(async () => {

    owner = await ethers.provider.getSigner(0);
    ownerAddress = await owner.getAddress();
    friend = await ethers.provider.getSigner(1);
    friendAddress = await friend.getAddress();

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
  });

  it("should associate the owner of the gang to its CID", async () => {
    assert.equal(cid, map.get(ownerAddress));
  });

  it("should not associate the friend to any CID", async () => {
    assert.isUndefined(map.get(friendAddress));
  });


})

