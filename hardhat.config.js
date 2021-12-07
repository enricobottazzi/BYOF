require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");


module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY1}`, `0x${process.env.RINKEBY_PRIVATE_KEY2}`, `0x${process.env.RINKEBY_PRIVATE_KEY3}`, `0x${process.env.RINKEBY_PRIVATE_KEY4}` ],
    } 
  }
};