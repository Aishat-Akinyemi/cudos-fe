import { setupWebKeplr, CosmWasmClient } from "cosmwasm";
import environment from "./config";

const env = environment("testnet");
const QUERY_GREETING = { get_greeting : {}}
const QUERY_REPLIES = { get_replies: {} }

export async function signout(){
    //todo
}


//returns a SigningCosmosClient
export async function signin() {
    // Keplr extension injects the offline signer that is compatible with cosmJS.
    // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
    // And it also injects the helper function to `window.keplr`.
    // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
    } else {
        //this config object will be passed to setupWebKeplr() method. 
        const config = {
            chainId: env.chainId,
            rpcEndpoint: env.nodeUrl,
            prefix: "wasm",
            gasPrice: env.gasPrice //an optional parameter        
        };

        // You should request Keplr to enable the wallet.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        // If you don't request enabling before usage, there is no guarantee that other methods will work.
        // This metod returns a permissioned SigningCosmosClient.
        const client = await setupWebKeplr(config);
        return client;        
    }
}


//get user balance
export async function getBalance(client) {
    const offlineSigner = window.getOfflineSigner(env.chainId);
    // You can get the address/public keys by `getAccounts` method.
    // It can return the array of address/public key.
    // But, currently, Keplr extension manages only one address/public key pair.
    // XXX: This line is needed to set the sender address for SigningCosmosClient.
    const accounts = await offlineSigner.getAccounts();  
    return {
        address: accounts[0].address,
        balance:  await client.getBalance(accounts[0].address, "acudos")
    }
}

async function getCosmWasmClient(){
    if(window.cosmWasmClient) return window.cosmWasmClient
    window.cosmWasmClient = await CosmWasmClient.connect(env.nodeUrl);
    return window.cosmWasmClient;
}

//load greeting from the smartcontract using the readonly cosmwasmclient
export async function getGreeting() {
    const client = await getCosmWasmClient();
    const res = await client.queryContractSmart(env.contractAdd, QUERY_GREETING);      
    return res;
}

//load responses from the smartcontract using the readonly cosmwasmclient
export async function getReplies() { 
    const client = await getCosmWasmClient();
    const res = await client.queryContractSmart(env.contractAdd, QUERY_REPLIES);      
    return res;
}

//write onto the smartcontract with execute function
export async function submitResponse(client, text) {
    const offlineSigner = window.getOfflineSigner(env.chainId);
    const accounts = await offlineSigner.getAccounts();  
    let responseMsg = { respond: {response: text} };
    let tx = await client.execute(accounts[0].address, env.contractAdd, responseMsg, "auto");  
   
}



