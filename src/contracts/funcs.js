import {readContract} from "./accessors";
import contract from "./getContract";

export const getLastGame = async () => {
  const lg = await readContract(contract.lastGame);
  console.log(lg);
  return await readContract(contract.lastGame);
}

export const getCounter = async () => {
  const lg = await getLastGame();
  const ts = lg.ended - Date.now()/1000;
  let tr = {
    days: parseInt(ts/3600/24),
    hours: parseInt(ts/3600),
    minutes: parseInt(ts/60),
    seconds: parseInt(ts)
  };
  tr.seconds -= tr.minutes*60;
  tr.minutes -= tr.hours*60;
  tr.hours -= tr.days*24;
  console.log(tr);
  return tr;
}

