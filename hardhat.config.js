require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY1}`, `0x${process.env.RINKEBY_PRIVATE_KEY2}`, `0x${process.env.RINKEBY_PRIVATE_KEY3}`, `0x${process.env.RINKEBY_PRIVATE_KEY4}` ],
    } 
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: `${process.env.ETHERSCAN_API_KEY}`
  }
};