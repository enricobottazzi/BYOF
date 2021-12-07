const { ethers } = require('hardhat');

async function createGang(signer1, signer2) {
  
    // let's say address1 wants to ask a address2 to his list 
    // address2 has to confirm it by signing a message
    const owner = await signer1.getAddress()
    const friend = await signer2.getAddress()

    let gang = []

    const message = `I am ${owner} and I want to add you to my gang`    
    const signature = await signer2.signMessage(message);
    const signerAddress = await ethers.utils.verifyMessage(message, signature);

    if (signerAddress == friend){
      gang.push(friend);
      console.log(`${friend} is now part of ${owner} gang`);
    }

    if (signerAddress != friend){
        console.log(`you are not my friend`);
    }

    return gang;
}

module.exports = createGang;

