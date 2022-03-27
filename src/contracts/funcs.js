import {readContract} from "./accessors";
import contract from "./getContract";

const lastGame = await (async () => {
  const lg = await readContract(contract.lastGame);
  console.log('Last game: ', lg);
  return lg;
})()

export const getCounter = await (async () => {
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
})()

const tickets = await (async () => {
  const tickets = await readContract(contract.members);
  console.log('Tickets: ', tickets);
  return tickets;
})()

export const ticketsCount = tickets.length;

const players = new Set(tickets)

export const playersCount = players.size

export const allGames = await (async () => {
  const games = await readContract(contract.allGames);
  console.log('Games: ', games);
  return games;
})()
