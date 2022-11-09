

function environment(env) {
    switch (env) {
      case "mainnet": 
        return {
          chainId: "mainnet",
          nodeUrl: "https://rpc.mainnet.near.org",
          // contractAdd: CONTRACT_ADD,
          explorerUrl: "https://explorer.mainnet.near.org",
          gasPrice: "0.15acudos"
        };
      case "testnet": 
        return {
          chainId: "cudos-testnet-public-3",
          nodeUrl: "https://sentry1.gcp-uscentral1.cudos.org:36657",
          contractAdd: "cudos1zz89vvmdwxuww63034jhdvtu449w7hxyd4zt3rwylryd2nm3rkuqm37cut",
          explorerUrl: "https://rest.explorer-v1.testnet.cudos.org/",
          gasPrice: "0.15acudos"
        };
      case "local": 
        return {
          // chainId: "CudosTestnet-Public-v3",
          chainId : "cudos-network",
          nodeUrl: "https://localhost:26657",
          // contractAdd: CONTRACT_ADD,
          gasPrice: "0.15acudos"
        };
      default:
        throw Error(`Unknown environment '${env}'.`);
    }
  }
  
  export default environment;