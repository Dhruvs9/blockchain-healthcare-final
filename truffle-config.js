module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache default host
      port: 7545,            // Ganache default port
      network_id: "*",       // Match any network ID
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",     // Must match your contract's pragma version
      settings: {
        optimizer: {
          enabled: true,     // Enable optimizer for gas efficiency
          runs: 200
        }
      }
    }
  },

  // Disable Truffle DB (not needed for this project)
  db: {
    enabled: false
  }
};