const { ethers } = require('hardhat');

async function createGang() {

    let ownerAdd
    let friend // = ethers signer object
    let friendAdd // = address of the signer 
    let gang = []
    
    // let's say you want to ask a friend to your list 
    // first you need to ask for a singature from the friend that you want to add
    let message = `I am ${ownerAdd} and I want to add you to my gang`    
    signature = await friend.signMessage(message);
    console.log(signature);
    console.log(`${await friend.getAddress()} is now part of ${await owner.getAddress()} gang`);
    gang.push(friendAdd);
    return gang;
}

createGang();

module.exports = createGang;

