const { assert, expect} = require("chai");
const createGang = require("../scripts2/0.createGang");
const deploy = require("../scripts2/2.deploy");
const mintNFT = require("../scripts2/4.mintNFT");
const initializeIPFS = require("../scripts2/-1.initializeIPFS.js")
const decrypt = require("../scripts2/6.decrypt.js")
const update = require("../scripts2/7.update.js");
const getTokenURI = require("../scripts2/5.getTokenURI");

describe("Create Gang and Mint the NFT", () => {

let contract, owner, ownerAddress, friendAddress, tokenID, secretKey, ipfs, friend, newFriend
        
    before(async () => {
        owner = await ethers.provider.getSigner(0);
        ownerAddress = await owner.getAddress()
        friend = await ethers.provider.getSigner(1);
        friendAddress = await friend.getAddress()
        newFriend = await ethers.provider.getSigner(2);
        deployer = await ethers.provider.getSigner(3);

        secretKey = '12345'

        gang = await createGang(owner, friend)
        contract = await deploy(deployer);
        ipfs = await initializeIPFS();
        tokenID = await mintNFT(contract.address, owner, secretKey, gang, ipfs)

    });
  
    it("should have minted an NFT to the owner", async () => {
        assert.equal(1, await contract.balanceOf(ownerAddress))  
    })


    it ("should not allow the owner to mint a second NFT", async () => {
        await expect (contract.connect(owner).awardItem(ownerAddress, "aaa")).to.be.reverted;
    })

    it ("the owner shouldn't be allow to transfer the NFT", async () => {
        await expect(contract.connect(owner).transferFrom(ownerAddress, friendAddress, tokenID)).to.be.reverted;
    })


    it ("should decrypt the token URI and match it with the original gang", async () => {
        const decryptedData = await decrypt (contract.address, tokenID, secretKey, ipfs)
        assert.equal(gang[0], decryptedData[0])  
    })

    it("should not allow another address to update the NFT", async () => {
        await expect (contract.connect(friend).updateTokenURI(tokenID, "aaaa")).to.be.reverted;
    });

    it("should allow the owner to update the NFT", async () => {
        initalTokenURI = await getTokenURI(contract.address, tokenID)
        await update (owner, newFriend, contract.address, tokenID, secretKey, ipfs);
        finalTokenURI = await getTokenURI(contract.address, tokenID)
        assert.notEqual(initalTokenURI, finalTokenURI);
    });


    it ("should decrypt the IPFS content and match it with the new array of friends", async () => {
        decryptedData = await decrypt(contract.address, tokenID, secretKey, ipfs)
        assert.equal(await newFriend.getAddress(), decryptedData[1])  
    })





});