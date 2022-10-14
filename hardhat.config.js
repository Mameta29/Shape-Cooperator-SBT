require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');

/** @type import('hardhat/config').HardhatUserConfig */

const { API_URL, PRIVATE_KEY, APP_ETHERSCAN_KEY } = process.env;
module.exports = {
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: APP_ETHERSCAN_KEY,
  },
};
