const CONTRACT_ADD = "cudos1zz89vvmdwxuww63034jhdvtu449w7hxyd4zt3rwylryd2nm3rkuqm37cut";

function environment(env) {
    switch (env) {
      case "mainnet": 
        return {
          chainId: "mainnet",
          nodeUrl: "https://rpc.mainnet.near.org",
          contractAdd: CONTRACT_ADD,
          explorerUrl: "https://explorer.mainnet.near.org"
        };
      case "testnet": 
        return {
          chainId: "cudos-testnet-public-3",
          nodeUrl: "https://sentry1.gcp-uscentral1.cudos.org:36657",
          contractAdd: CONTRACT_ADD,
          explorerUrl: "https://rest.explorer-v1.testnet.cudos.org/",
        };
      case "local": 
        return {
          // chainId: "CudosTestnet-Public-v3",
          chainId : "cudos-network",
          nodeUrl: "https://localhost:26657",
          contractAdd: CONTRACT_ADD,
          explorerUrl: "https://explorer.testnet.near.org",
          mnemonic: "sauce injury film toddler swamp cabin struggle eight social spawn ankle sort"
        };
      default:
        throw Error(`Unknown environment '${env}'.`);
    }
  }
  
  export default environment;