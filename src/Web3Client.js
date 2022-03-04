import Web3 from 'web3';
import LotteryContractBuild from './artifacts/contracts/MyLottery.sol/MyLottery.json';
let selectedAccount;
let contract;
let isInited = false;
let currentLotteryId = 0;
export const init = async () => {
    let provider = window.ethereum;
    if (typeof provider !== 'undefined'){
        provider.request({method: 'eth_requestAccounts'}).then((accounts)=> {
            selectedAccount = accounts[0];
            console.log('this is account: '+ selectedAccount);
        })
        .catch((err)=> {
            console.log(err);
            return;
        });

        window.ethereum.on('accountsChanged', function (accounts){
            selectedAccount = accounts[0];
            console.log('selected account change to'+ selectedAccount);
        })
    }

    const web3 = new Web3(provider);
    contract = new web3.eth.Contract(LotteryContractBuild.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    isInited = true;
    currentLotteryId = contract.methods.viewCurrentLotteryId();
}

export const buyTicket = async () => {
    if (!isInited) {
        await init();
    }
    if (currentLotteryId > 0){
        let lotteryId = 1;
        let number = 10;
        let amount = 20;
        console.log(contract);
        return contract.methods.buyTicket(lotteryId, number, amount).send({from: selectedAccount});
    }else {
        alert('chưa mở lottery');
    }
}