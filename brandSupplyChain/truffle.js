const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "bc85f0ad43464ef48026b10376b6f750";

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${infuraKey}`),
      network_id: 4
    },
  }
};