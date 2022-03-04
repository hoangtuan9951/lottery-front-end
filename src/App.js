import { useEffect } from 'react';
import './App.css';
import { init, buyTicket } from './Web3Client';

function App() {
  const buy = () => {
    buyTicket().then(tx =>{
      console.log(tx)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(()=> {
    init();
  })
  return (
    <div onClick={()=> buy()} className="App"><button>Buy ticket</button></div>
  );
}

export default App;
