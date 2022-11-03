import logo from './logo.svg';
import ResponseList from './components/ResponseList';
import ResponseForm from './components/ResponseForm';
import Wallet from './components/Wallet';
import { useEffect, useState, useCallback } from 'react';
import { signin, getBalance, getGreeting, submitResponse, getReplies } from "./utils/cudos";

import './App.css';

function App() {
  const getGreetingMsg = async () => {setGreeting(await getGreeting())};
  const [greeting, setGreeting] = useState("");
  const [client, setClient] = useState();
  const [user, setUser] = useState(); 
  const [canRespond, setCanRespond] = useState(false);
  const [replies, setReplies] = useState([]);

  const logIn = () => {
    signin().then( res => {
        setClient(res);        
        getBalance(res).then(
          res => {
            setUser(res);
          }
        )
    },
    err => alert(err));
  }

  const getResponses = useCallback(async () => {
    try {
      setReplies((await getReplies()).replies);   
      isUserAlreadyReplied();
    } catch (error) {
      alert({error});
    }      
  });

  useEffect(() => {
    getGreetingMsg();
    getResponses();
  }, [user]);
  const submit = (resp)=>{
    
    submitResponse(client, resp).then(
      res=> {
        alert("success"); 
        getResponses();       
      },
      err => alert(err)
    )
  }
  
  const isUserAlreadyReplied = ()=> {
    if (user == null) {
      return;
    } 
    const index = replies.find( reply => reply.addr === user.address );
    if (!index) {
      setCanRespond(true) ;
      return;
    }
  }
  

  return (
    <div className="App">
      <header className="App-header"> 
        <h1>Messaging dApp</h1> 
        <Wallet login={logIn} user={user}></Wallet>      
      </header>
      <main>
        <h2>The dApp says: {greeting}</h2>
        { canRespond &&
          <ResponseForm submit={submit}/>
        }
        <ResponseList replies={replies}/>
      </main>
    </div>
  );
}

export default App;
