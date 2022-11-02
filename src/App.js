import logo from './logo.svg';
import ResponseList from './components/ResponseList';
import ResponseForm from './components/ResponseForm';
import Wallet from './components/Wallet';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <h1>Messaging dApp</h1> 
        <Wallet></Wallet>      
      </header>
      <main>
        <h2>The dApp says: Hello World!</h2>
        <ResponseForm/>
        <ResponseList/>
      </main>
    </div>
  );
}

export default App;
