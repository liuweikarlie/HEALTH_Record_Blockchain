import { Disclosure } from "@headlessui/react";
import { WalletIcon } from "@heroicons/react/24/outline";
import SecretNetworkLogo from "./SecretNetworkLogo.svg";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase';
import { doc, getDoc,setDoc,getDocs,query ,where } from "firebase/firestore";
import { Web3Storage, getFilesFromPath } from 'web3.storage'

import React, { useState, useEffect } from "react";



import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const { SecretNetworkClient } = require("secretjs");

const DENOM = 'SCRT';
const MINIMAL_DENOM = 'uscrt';


const CHAIN_NAME = 'online Testnet';  //Anything you want
const GRPCWEB_URL = 'https://grpc.pulsar.scrttestnet.com';
const LCD_URL = 'https://api.pulsar.scrttestnet.com';
const RPC_URL = 'https://rpc.pulsar.scrttestnet.com';
const CHAIN_ID = "pulsar-2";
export default function App() {
let contractCodeHash="6d373c371971a1da7aaf1b2ded1d8285c0f3f20292436557df2867a7ae22d4cc";
let codeId=20868;
//const contractAddress="secret1vm87v47lh5p4jpvr7jl8ahs3paluu60z6fj6r6";
const [myAddress, setMyAddress] = useState("");
const [balance, setBalance] = useState();
const [keplrReady, setKeplrReady] = useState(false);
const [secretjs,setSecretjs]=useState();
const [contractAddress,setContractAddress]=useState("");
   
//const [contractAddress,setContractAddress ]=useState("");
  let [card,setCard]=useState([  ]);
  const [wordshow,setWorshow]=useState("");
  const [showpermit,setShowpermit]=useState("");
  const [userlist,setUserList]=useState([]);
  const [indexall,setIndexAll]=useState();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
  const apitocken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNiYzcwRUY5OWJjRjMwMjU1YzIxOTdlZEE3ZmQ4MDU4NzhBNjFhNTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODExMzE1MTQ3NzYsIm5hbWUiOiJoZWFsdGhyZWNvcmQifQ.34iOSYYMuSGTGzj0gB4hFNmP7ALV0JQH5RG_pyFrmmY";
  const client=new Web3Storage({token:apitocken});
  //const contrastAddress='secret1vm87v47lh5p4jpvr7jl8ahs3paluu60z6fj6r6';
  
  
  const user_present=async(event)=>{
  var listofuser=[];
   let q=query(collection(db, "doctor_user"),where("doctor","==",myAddress));
   console.log(q);
   const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
   console.log(doc.data());
  var doctor_user_Info={
 
  	name: doc.data()['user'],
  	viewing_key:doc.data()['key'],
  	viewing_index:doc.data()['index']
  
  };
  console.log(doctor_user_Info);
  listofuser.push(doctor_user_Info);
  
 
	});

setUserList(listofuser);
  
  
  }
  
  const handleClose=()=>{
   setOpen(false);
  
  
  
  
  };
  
  const handleClose1=()=>{
   setOpen1(false);
  
  
  
  
  };
  const appoitment=async(event)=>{
  var id =event.target.id;
  
  //var id=event.target.currentTarget.id.value;
  
  let msglog= {
      sender: myAddress,
      contract_address: contractAddress,
      msg: {
        permission_write: {
          wallet:id 
          
        }, 
      },
      code_hash: contractCodeHash,
    };

    const card_creation_tx = await secretjs.tx.compute.executeContract(msglog,{ gasLimit: 100_000 });
    console.log(card_creation_tx);
  

  }
  
  
  const v=async(event)=> {
try {
  const docRef = await addDoc(collection(db, "user"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
  };
  
  const handleClickOpen = () => {
    setOpen(true);
   
    
  };


  const upload =async(event)=>{
    	event.preventDefault();
  	let userid=event.target.id;
  	console.log(userid);
  	let fileInput=event.target.elements.file;
  	console.log(fileInput);
  	let rootCid = await client.put(fileInput.files);
  	console.log(rootCid);
  	
 
  	event.preventDefault();
  	console.log("upload start");
  	//const wordInformation=event.target.elements.wordInformation.value;
  	var card_get=card;
  	var card_init={
	      name: event.target.elements.name.value,
	      doctor: event.target.elements.doctor.value,
	      diagnosis:event.target.elements.diagnosis.value,
	      medicine:event.target.elements.medicine.value,
	      time:event.target.elements.time.value,
	      title: event.target.elements.name.value,
	      file:"https://"+rootCid+".ipfs.w3s.link",
	     
	        
	    };
	//setCard([card_init]);
	
	  const docRef1 = doc(db, "user", userid);

	  const docSnap = await getDoc(docRef1);
	  let result=docSnap.data();
	  console.log(result);
	  let index1=result['index'];
	  let contractAddress1=result['contract_address'];
	  //setContractAddress(contractAddress1);
	  
	   
  	//let index=indexall;
  	
  	
  	try{
  	console.log(secretjs);
  	let msglog= {
      sender: myAddress,
      contract_address: contractAddress1,
      msg: {
        create: {
          card: card_init,
          index: index1+1,
        },
      },
      code_hash: contractCodeHash,
    };
    
    
    console.log(msglog);
  	  
  	const card_creation_tx = await secretjs.tx.compute.executeContract(msglog,{ gasLimit: 100_000 });

  console.log(card_creation_tx);
  
   const docRef = await setDoc(doc(db, "user", userid), {

    contract_address: contractAddress1,   

    index:index1+1

  });
  setOpen1(false);
  
  //setContractAddress(contractAddress1);
  //setIndexAll(index+1);
}    
   
    
    catch (e){
  		console.error(e);
  	}
    
  	
  	
  
  };
  
 const handleClickOpen1 = () => {
    setOpen1(true);
  };
  
  const view=async(event)=>{
  	let userid=event.target.id;
  	console.log(userid);
  	let viewingkey="";
  	let index1=0;
  	
  	for (let i=0;i<userlist.length;i++){
  	
  		if (userlist[i]['user']==userid) {
  			viewingkey=i['viewing_key'];
  			index1=i['viewing_index'];
  			break;
  		
  		
  		}
  	
  	
  	}
  	
  		
  	try{
  	const docRef1 = doc(db, "user",userid);
 
	  const docSnap = await getDoc(docRef1);
	  console.log(docSnap);
	  let result=docSnap.data();
	  console.log(result);
	  //let index1=result['index'];
	   let contractAddress1="";
	  
	   contractAddress1=result['contract_address'];
	   console.log(contractAddress1); 

  
	var count=0;
  	for (let i=1;i<=1;i++){ 
  	console.log("fdsaf");
  	
  	let querylog=  {
		get_card_viewer:{
			wallet:myAddress,
			viewing_key:"api_key_oUcmA1NKcXEDcVaA8IOm6Uvt7ghmQVtW9R8bnPT7qwI=",
			index:1,
			
		},
		
	
	};
    
    
 
  	  
  	let business_card_query_tx=await secretjs.query.compute.queryContract({
	contract_address:contractAddress1,
	query:querylog,
	code_hash:contractCodeHash,
	
});
console.log("daf");
console.log(business_card_query_tx);

  //console.log(business_card_query_tx);
  var new_card=business_card_query_tx.card;
  var currchard=card;
  if ((typeof (new_card) !="undefined" )&& (1>card.length)){
  
  new_card['id']=count;
  currchard.push(new_card);
  setCard(currchard); 
  console.log(new_card);
  console.log(card);
  count=count+1;
  
  }
  
  }
  
  
      setOpen(true);

 
  
	//window.location.reload(false);
   
}
   
    
    catch (e){
  		console.error(e);
  	}
    
  	
  
  	
  
  };
  
  
  
  const key=async(event)=>{
  	
  	//event.preventDefault();
  	console.log("key ");
  	//const wordInformation=event.target.elements.wordInformation.value;
  	
  
  	
  	try{
  	
  	let querylog=  {
		get_key_record:{
			wallet:myAddress,
			viewing_key:"daf",
			index:2,
			
		},
		
	
	};
    

  	let business_card_query_tx=await secretjs.query.compute.queryContract({
	contract_address:contractAddress,
	query:querylog,
	code_hash:contractCodeHash,
	
});

  //console.log(business_card_query_tx);
  var new_card=business_card_query_tx.card;
  setCard([new_card]);
  console.log(new_card);
  console.log(card)
 
  
	//window.location.reload(false);
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
      console.log(myAddress);
      
      try {
      
      	const docRef1 = doc(db, "doctor", myAddress);

      	const docSnap = await getDoc(docRef1);
      	
      	if (docSnap.exists()) {
      	
      			  let contractAddressnow=docSnap.data();
      		         
			  console.log(contractAddressnow);
			  } 
			  
	}
	
	/*		  
	else {
	    console.log("No such document!");
	    //view();
	
	
	  const initMsg = { entropy: "this " };
  	  let tx = await secretjs.tx.compute.instantiateContract(
   	 {
	      code_id: codeId,
	      sender: myAddress,
	      code_hash: contractCodeHash,
	      init_msg: initMsg,
	      label: "Secret BUsiness card improve Demo V6" +Math.ceil(Math.random() * 10000),
	    },
	    {
	      gasLimit: 400_000,
	    }
	  );

	  //Find the contract_address in the logs
	  let arraylog1=tx.arrayLog
	  console.log(arraylog1);
	  
	 const contractAddress1 = arraylog1.find(
	    (log) => log.type === "message" && log.key === "contract_address"
	  ).value;
	  console.log(contractAddress1);
	  
	  setContractAddress(contractAddress1);
	  	  console.log(contractAddress);
			


      	
            const docRef = await setDoc(doc(db, "user", myAddress), {
              contract_address: contractAddress1,   
              index:0
               
            });
            console.log("Document written with ID: ", docRef);
                 setIndexAll(0);
          }
         
          
          
          } 
          
          */
          
          catch (e) {
            console.error("Error adding document: ", e);
          }
          
           
     	user_present().catch(console.error);
     
          
	
      setKeplrReady(true);
      setMyAddress(myAddress);
      
      //view();
     //key();
      
    }
    
      getKeplr();
      
    return () => {};
  }, []);
  

  return (
    <div className="App">
      

      {!keplrReady ? 
          <h1>Waiting for Keplr wallet integration...</h1>
      : 
      
       <>
      
       <div className="min-h-full">
        <div className="bg-gray-800">
          <Disclosure as="nav" className="bg-black">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-black">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src={SecretNetworkLogo}
                            alt="Secret Network Logo"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/">
                              <div className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                                <div>Home</div>
                              </div>
                            </Link>

                            <Link to="/my-cards">
                              <div className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                               
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                           
                          >
                            <span className="sr-only">View notifications</span>
                            <WalletIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                          
                            <p style={{ color: 'white' }}>SCRT : {balance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Secret Health Record
              </h1>
            </div>
          </header>
        </div>
      </div>
      
      
      
      
       <div className="pt-4 ml-6 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                View Patient List
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Click to view more information and write the health record
              </p>
            </div>
          </div>
          
          <div className="mt-5 mr-2 md:col-span-2 md:mt-0" >
          <Button size="small" >View the record</Button>
          
          {userlist.map((value,index)=>(
       
    
           <Card sx={{ minWidth: 275 ,m:2}} key={index}>
      <CardContent>
    
        <p>{value['name']}</p>
        <p>{value['viewing_key']}</p>
        
        <p>{value['viewing_index']}</p>
        
      </CardContent>  
      <CardActions>
        <Button   name="bad" id={value['name']} onClick={view} > record</Button>
           <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Health Record</DialogTitle>
       
            Information
            {card.map((value)=>(
       
    
           <div  key={index.id}>
    
    
        <p>{value.name}</p>
        <p>{value.doctor}</p>
         <p>{value.diagnosis}</p>
        <p>{value.medicine}</p>
         <p>{value.time}</p>
        <p><a href={value.file} target="_blank">{value.file}</a></p>
        
  
     
    </div>
    
    
    ))} 
     
        <DialogActions>
          <Button onClick={handleClose}>Finish</Button>
         
        </DialogActions>
      </Dialog>
       
       
       
        <Button  id={value['name']} onClick={handleClickOpen1} size="small" >write record</Button>
        
           <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Upload</DialogTitle>
         <form onSubmit={upload} id={value['name']}>
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
                        doctor
                      </label>
                      <input
                        type="text"
                        name="doctor"
                        id="doctor"
                        autoComplete="doctor"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        diagnosis
                      </label>
                      <input
                        type="text"
                        name="diagnosis"
                        id="diagnosis"
                        autoComplete="diagnosis"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                       medicine
                      </label>
                      <input
                        type="text"
                        name="medicine"
                        id="medicine"
                        autoComplete="medicine"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                      <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        time
                      </label>
                      <input
                        type="text"
                        name="time"
                        id="time"
                        autoComplete="medicine"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                     <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Files Input
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        autoComplete="file"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                  </div>
                </div>

                
              </div>
                        <Button type="submit" >Finish</Button>
            </form>
       
          
           
        <DialogActions>

         
        </DialogActions>
      </Dialog>
       
        
        
      
     </CardActions>
    </Card>
     
    
    ))}
            
          </div>
        </div>
      </div>
      
       
      
      
      
   
      
      
      
      
      
      
      
      
      
   </>
      }
      </div>
  );
}
