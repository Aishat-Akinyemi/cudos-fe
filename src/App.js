import logo from './logo.svg';
import ResponseList from './components/ResponseList';
import ResponseForm from './components/ResponseForm';
import Wallet from './components/Wallet';
import { useEffect, useState } from 'react';
import { signin, getBalance, getGreeting, submitResponse } from "./utils/cudos";

import './App.css';

function App() {
  const getGreetingMsg = async () => {setGreeting(await getGreeting())};
  const [greeting, setGreeting] = useState("");
  const [client, setClient] = useState();
  const [user, setUser] = useState(); 
  const [canRespond, setCanRespond] = useState(false);

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

  useEffect(() => {
    getGreetingMsg();
  }, []);

  const submit = (resp)=>{
    
    submitResponse(client, resp).then(
      res=> {
        alert("success");        
      },
      err => alert(err)
    )
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
        <ResponseList currentUser={user} updateCanRespond={setCanRespond}/>
      </main>
    </div>
  );
}

export default App;
