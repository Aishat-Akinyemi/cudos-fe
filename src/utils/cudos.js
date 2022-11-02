import { Secp256k1HdWallet, Secp256k1Wallet, SigningCosmosClient, coins } from '@cosmjs/launchpad';
import {
    DirectSecp256k1HdWallet
} from '@cosmjs/proto-signing';
import {
    assertIsBroadcastTxSuccess,
    SigningStargateClient,
} from '@cosmjs/stargate';
import { setupWebKeplr, CosmWasmClient, MsgExecuteContractEncodeObject } from "cosmwasm";
import environment from "./config";

const env = environment("testnet");
const QUERY_GREETING = { get_greeting : {}}
const QUERY_REPLIES = { get_replies: {} }


//sign in with keplr and SigningCosmosClient
export async function signinWithCosmos() {
    // Keplr extension injects the offline signer that is compatible with cosmJS.
    // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
    // And it also injects the helper function to `window.keplr`.
    // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
    } else {

    const chainId = env.chainId;

    // You should request Keplr to enable the wallet.
    // This method will ask the user whether or not to allow access if they haven't visited this website.
    // Also, it will request user to unlock the wallet if the wallet is locked.
    // If you don't request enabling before usage, there is no guarantee that other methods will work.
    await window.keplr.enable(chainId);

    const offlineSigner = window.getOfflineSigner(chainId);

    // You can get the address/public keys by `getAccounts` method.
    // It can return the array of address/public key.
    // But, currently, Keplr extension manages only one address/public key pair.
    // XXX: This line is needed to set the sender address for SigningCosmosClient.
    const accounts = await offlineSigner.getAccounts();  

    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    const cosmJS = new SigningCosmosClient(
        env.nodeUrl,
        accounts[0].address,
        offlineSigner,
    );   

    //document.getElementById("address").append(accounts[0].address);
    // getKey(env.chainId) returns promise with name, pubKey, address...
    console.log(await window.keplr.getKey(env.chainId));
}

};

export async function signinWithStargate() {
    // Keplr extension injects the offline signer that is compatible with cosmJS.
    // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
    // And it also injects the helper function to `window.keplr`.
    // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
    } else {

    const chainId = env.chainId;

    // You should request Keplr to enable the wallet.
    // This method will ask the user whether or not to allow access if they haven't visited this website.
    // Also, it will request user to unlock the wallet if the wallet is locked.
    // If you don't request enabling before usage, there is no guarantee that other methods will work.
    await window.keplr.enable(chainId);

    const offlineSigner = window.getOfflineSigner(chainId);

    // You can get the address/public keys by `getAccounts` method.
    // It can return the array of address/public key.
    // But, currently, Keplr extension manages only one address/public key pair.
    // XXX: This line is needed to set the sender address for SigningCosmosClient.
    const accounts = await offlineSigner.getAccounts();  

    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    const client = await SigningStargateClient.connectWithSigner(
        env.nodeUrl,
        offlineSigner,
    );  
     
    console.log(await client.getAllBalances(accounts[0].address))
   
    //document.getElementById("address").append(accounts[0].address);
    // getKey(env.chainId) returns promise with name, pubKey, address...
    //console.log(await window.keplr.getKey(env.chainId));
    //test with messaging
     }

};

export async function signout(){
    //todo
}

export async function getResponses() {

}

//sign in with CosmJS, read and write onto the smartcontract with execute function, and read balances
export async function signInWithCosmJs() {
    const config = {
        chainId: env.chainId,
        rpcEndpoint: env.nodeUrl,
        prefix: "wasm",
        gasPrice: "0.15acudos"
        
    };

    const client = await setupWebKeplr(config);
    const offlineSigner = window.getOfflineSigner(env.chainId);
    const accounts = await offlineSigner.getAccounts();
    console.log(accounts[0]);  
    console.log(client.getBalance(accounts[0].address, 'acudos'))
    

    const contractAddr = env.contractAdd;
    console.log(await client.queryContractSmart(contractAddr, { get_replies : {}}));
    console.log(await client.getBalance(accounts[0].address, "acudos"));

   const client1 = await CosmWasmClient.connect(config.rpcEndpoint);
 
    
  const config1 = await client1.queryContractSmart(contractAddr, QUERY_GREETING);
  

 let entryPoint = { respond: {response: 'hi'} };
let tx = await client.execute(accounts[0].address, env.contractAdd, entryPoint, "auto");
}

//trying to use cosmjs signAndBroadcast method but falling into errors
export async function si() {
    const config = {
        chainId: env.chainId,
        rpcEndpoint: env.nodeUrl,
        prefix: "wasm",
        gasPrice: "0.001acudos"
    };

    const client = await setupWebKeplr(config);
    const offlineSigner = window.getOfflineSigner(env.chainId);
    const accounts = await offlineSigner.getAccounts();
    console.log(accounts[0]);  
    console.log(client.getBalance(accounts[0].address, 'acudos'))
    

    const contractAddr = env.contractAdd;
    console.log(await client.queryContractSmart(contractAddr, { get_greeting : {}}));

  const client1 = await CosmWasmClient.connect(config.rpcEndpoint);
 
    
  const config1 = await client1.queryContractSmart(contractAddr, QUERY_GREETING);
  
    const msg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
            sender: accounts[0].address,
            contract: env.contractAdd,
            msg: { respond: {response: 'hi'} },
            funds: []
        }
    }

 
 const fee = {
            amount: [{
                denom: 'acudos',
                amount: '5000',
            }, ],
            gas: '200000',
 }
  const exec = await client.signAndBroadcast(accounts[0].address, );
  console.log(exec);




}