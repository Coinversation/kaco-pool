require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");


const { mnemonic, BSCSCANAPIKEY} = require('../secret.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    // ropsten: {
    //   url: process.env.ROPSTEN_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    testnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
      chainId: 97,
      gasPrice: 5000000000,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed1.ninicoin.io/",
      chainId: 56,
      gasPrice: 5000000000,
      accounts: {mnemonic: mnemonic}
    },
    shidenMainnet: {
      url: "https://rpc.shiden.astar.network:8545",
      chainId: 336,
      gasPrice: 1000000000,
      accounts: {mnemonic: mnemonic}
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: BSCSCANAPIKEY,
  },
  mocha: {
    timeout: 20000
  }
};
