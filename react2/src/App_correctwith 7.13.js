import React, { useState, useEffect } from "react";
const { SecretNetworkClient } = require("secretjs");

const DENOM = 'SCRT';
const MINIMAL_DENOM = 'uscrt';


const CHAIN_NAME = 'online Testnet';  //Anything you want
const GRPCWEB_URL = 'https://grpc.pulsar.scrttestnet.com';
const LCD_URL = 'https://api.pulsar.scrttestnet.com';
const RPC_URL = 'https://rpc.pulsar.scrttestnet.com';
const CHAIN_ID = "pulsar-2";
export default function App() {
  const contractCodeHash="8577aab4926b9a0fcb264c783ef25be728e0c0eba1811893569a8eb2421269a4";
  const codeId=20729;
  const contractAddress="secret1vm87v47lh5p4jpvr7jl8ahs3paluu60z6fj6r6";
  const [myAddress, setMyAddress] = useState("");
  const [balance, setBalance] = useState();
  const [keplrReady, setKeplrReady] = useState(false);
  const [secretjs,setSecretjs]=useState();
  //const [contractAddress,setContractAddress ]=useState("");
  let [card,setCard]=useState([
    {
      name: "",
      address: "",
      phone: "",
      index: "",
    }
  ]);
  const [wordshow,setWorshow]=useState("");
  const [showpermit,setShowpermit]=useState("");
  //const contrastAddress='secret1vm87v47lh5p4jpvr7jl8ahs3paluu60z6fj6r6';
  
  const upload =async(event)=>{
 
  	event.preventDefault();
  	console.log("upload start");
  	//const wordInformation=event.target.elements.wordInformation.value;
  	setCard({
	      name: event.target.elements.name.value,
	      address: event.target.elements.address.value,
	      phone: event.target.elements.phone.value,
	      index: 1,
	    });
  	console.log(card);
  	
  	try{
  	console.log(secretjs);
  	let msglog= {
      sender: myAddress,
      contract_address: contractAddress,
      msg: {
        create: {
          card: {
            name: "DElete me",
            address: "DElete me ",
            phone: "12345678953",
          },
          index: 2,
        },
      },
      code_hash: contractCodeHash,
    };
    
    
    console.log(msglog);
  	  
  	const card_creation_tx = await secretjs.tx.compute.executeContract(msglog,{ gasLimit: 100_000 });

  console.log(card_creation_tx);
}    
   
    
    catch (e){
  		console.error(e);
  	}
    
  	
  	
  
  };
  
  
/*
  const permitrequest=async(event)=>{
  	const contractaddress=event.target.elements.contractnumber.value
  
  	let permit=await secretjs.utils.accessControl.permit.sign(
  		myAddress,
  		CHAIN_ID,
  		"test",
  		[contractaddress],
  		["owner","balance"].

  	);
  	
  	console.log("it have the request and give the permit");
  	let querypermit={
  		"with_permit":permit
  	}
  	const outputinformation=await secretjs.query.compute.queryCOntract({
  		contract_address:contractaddress,
  		code_hash:contractCodeHash,
  		query:querypermit
  	
  	
  	});
  	
  	console.log(outputinformation.word);
  	setShowpermit(showpermit=>outputinformation.word);
  	
  	
  	
  
  
  
  };*/

  useEffect(() => {

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const getKeplr = async () => {

      // Wait for Keplr to be injected to the page
      while (
        !window.keplr &&
        !window.getOfflineSigner &&
        !window.getEnigmaUtils
      ) {
        await sleep(10);
      }


      await window.keplr.experimentalSuggestChain({
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        rpc: RPC_URL,
        rest: LCD_URL,
        bip44: {
          coinType: 529,
        },
        coinType: 529,
        stakeCurrency: {
          coinDenom: DENOM,
          coinMinimalDenom: MINIMAL_DENOM,
          coinDecimals: 6,
        },
        bech32Config: {
          bech32PrefixAccAddr: "secret",
          bech32PrefixAccPub: "secretpub",
          bech32PrefixValAddr: "secretvaloper",
          bech32PrefixValPub: "secretvaloperpub",
          bech32PrefixConsAddr: "secretvalcons",
          bech32PrefixConsPub: "secretvalconspub",
        },
        currencies: [
          {
            coinDenom: DENOM,
            coinMinimalDenom: MINIMAL_DENOM,
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: DENOM,
            coinMinimalDenom: MINIMAL_DENOM,
            coinDecimals: 6,
          },
        ],
        gasPriceStep: {
          low: 0.1,
          average: 0.25,
          high: 0.4,
        },
        features: ["secretwasm"],
      });

 
      await window.keplr.enable(CHAIN_ID);


      const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);

      const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
      
   
      
      const secretjs = new SecretNetworkClient({
	  chainId: "pulsar-2",
	  url: "https://api.pulsar.scrttestnet.com",
	  wallet: keplrOfflineSigner,
	  walletAddress: myAddress,
	});
	
	setSecretjs(secretjs);
	
      const {
        balance: { amount },
      } = await secretjs.query.bank.balance(
        {
          address: myAddress,
          denom: MINIMAL_DENOM,
        }
      );
      setBalance(new Intl.NumberFormat("en-US", {}).format(amount / 1e6))

      setKeplrReady(true);
      setMyAddress(myAddress);
      
    }
      getKeplr();
      
    return () => {};
  }, []);
  

  return (
    <div className="App">
      <h1>Secret Dapp</h1>

      {!keplrReady ? 
          <h1>Waiting for Keplr wallet integration...</h1>
      : 
      
      <div className="pt-4 ml-6 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create a Secret Business Card
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Create a Secret Business Card with customizable privacy.
              </p>
            </div>
          </div>
          <div className="mt-5 mr-2 md:col-span-2 md:mt-0">
            <form onSubmit={upload}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        autoComplete="card number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
   
      }
      </div>
  );
}
