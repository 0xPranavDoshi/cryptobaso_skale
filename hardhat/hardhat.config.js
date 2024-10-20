require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();
const { SKALE_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://testnet.skalenodes.com/v1/juicy-low-small-testnet` || "",
      accounts: [SKALE_PRIVATE_KEY]
    },
  }
};