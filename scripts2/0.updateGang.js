const { ethers } = require('hardhat');

async function updateGang(signer1, signer3, gang) {
  
    const owner = await signer1.getAddress()
    const newFriend = await signer3.getAddress()

    const message = `I am ${owner} and I want to add you to my gang`
    const signature = await signer3.signMessage(message);
    const signerAddress = await ethers.utils.verifyMessage(message, signature);

    if (signerAddress == newFriend){
      gang.push(newFriend);
      console.log(`${newFriend} is now part of ${owner} gang`);
    }

    if (signerAddress != newFriend){
        console.log(`you are not my friend`);
    }

    return gang;
}

module.exports = updateGang;
