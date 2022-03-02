import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3'
import contract from './artifacts/contracts/MyLottery.sol/MyLottery.json';
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = contract.abi;

function App() {
  const [account, setAccount] = useState();
  const [contactList, setContactList] = useState();
  const [contacts, setContacts] = useState([]);
  console.log(abi[0]);
  useEffect(()=> {
    async function load(){
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      const contactList = new web3.eth.Contract(contract, contractAddress);
      setContactList(contactList);
      const counter = await contactList.methods.count().call();
      for (var i = 1; i <= counter; i++) {
        const contact = await contactList.methods.contacts(i).call();
        setContacts((contacts) => [...contacts, contact]);
      }
    }
    load();
  }, []);

  return (
    <div>
      your account is 1: {account}
      <div><button title={account}>abc</button></div>
    </div>
  );
}

export default App;
