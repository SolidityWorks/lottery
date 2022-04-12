import {readContract, writeContract} from "./accessors";
import { ethers } from 'ethers';

import contractInterface from './Lottery.json';

export const contractAddress = '0x3c2Ab815CC109c0321dc4DA31278F1a21f45F70D';
export const abi = contractInterface.abi;
export const {ethereum} = window;

export const intToHex = (i) => '0x' + i.toString(16)

export const bsc = {
  chainId: intToHex(97),
  chainName: 'BNB Smart Chain Testnet',
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com/'],
  nativeCurrency: {symbol: 'tBNB', decimals: 18}
}

export const chainCheck = () => ethereum.chainId === bsc.chainId;

export const chainSet = async () => {
  try {
    if (!await ethereum.request({method: 'wallet_switchEthereumChain', params: [{ chainId: bsc.chainId }]})) {
      console.log('BSC set')
    }
  } catch (switchError) {
    if (switchError.code === 4902) { // This error code indicates that the chain has not been added to MetaMask.
      await chainAdd()
    }
    console.log(switchError)
  }
}

export const chainAdd = async () => {
  try {
    await ethereum.request({method: 'wallet_addEthereumChain', params: [bsc]});
  } catch (addError) {
    console.log(addError)
  }
}

let ctr

export const getContract = async () => {
  try {
    /** get contract from blockchain */
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    ctr = new ethers.Contract(contractAddress, abi, signer);
    console.log('Contract: ', ctr);
    return ctr;
  } catch (err) {
    console.log(err)
  }
}




export const lastGame = async () => {
  let lg = await readContract((ctr || await getContract()).lastGame);
  lg = gameFormat(lg)
  console.log('Last game: ', lg);
  return lg;
}

const gameFormat = (game) => {
  return {
    started: parseInt(game.started),
    ended: parseInt(game.ended),
    ticketPrice: parseInt(game.ticketPrice) / 10**18,
    winnerTicketNumber: parseInt(game.winner),
  }
}

export const getCounter = async () => {
  const ts = -lastGame.ended + Date.now()/1000;
  let tr = {
    days: parseInt(ts/3600/24),
    hours: parseInt(ts/3600),
    minutes: parseInt(ts/60),
    seconds: parseInt(ts)
  };
  tr.seconds -= tr.minutes*60;
  tr.minutes -= tr.hours*60;
  tr.hours -= tr.days*24;
  console.log('Counter: ', tr);
  return tr;
}
let tickets;
const getTickets = async () => {
  if (!tickets) {
    tickets = (await readContract((ctr || await getContract()).members)) || [];
    console.log('Tickets: ', tickets);
  }
  return tickets;
}

export const ticketsCount = async () => (await getTickets()).length;

const players = async () => new Set(await getTickets())

export const playersCount = async () => (await players()).size

export const allGames = async () => {
  let games = await readContract((ctr || await getContract()).allGames);
  const arr = []
  for (const i in games) {
    arr.push(gameFormat(games[i]))
  }
  console.log(arr)
  return arr;
}

const gameStart = async () => {
  return await writeContract((ctr || await getContract()).gameStart, [5000000000, 600]);
}

const buyTicket = async (qnt) => {
  return await writeContract((ctr || await getContract()).buyTicket, [qnt]);
}

const requestRandomWords = async () => {
  return await writeContract((ctr || await getContract()).requestRandomWords);
}

const gameEnd = async () => {
  return await writeContract((ctr || await getContract()).gameEnd);
}
