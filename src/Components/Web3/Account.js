const {ethereum} = window;

const Account = async () => {
  if (ethereum) {
    const accs = await ethereum.request({'method': 'eth_requestAccounts'});
    console.log('Accounts: ', accs);
    return accs[0];
  } else {
    alert('You need to install MetaMask')
  }
};

export default Account;