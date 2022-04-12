import {ethers} from 'ethers';

import contractInterface from './Lottery.json';
import account from "../Components/Web3/Account";

// const contractAddress = "0x7f96DC9189Cfb467ffBAFFCB251C833C7e855ba3";
const contractAddress = "0x3c2Ab815CC109c0321dc4DA31278F1a21f45F70D";
const abi = contractInterface.abi;

const {ethereum} = window;

const contract = account ? (() => {
  try {
    /** From blockchain */
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log('Contract: ', contract);
    return contract
  } catch (err) {
    console.log(err)
  }
})() : null;

export default contract;