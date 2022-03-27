const {ethereum} = window;

export const getAccounts = async () => {
  if (!ethereum) {
    alert('You need to install MetaMask')
  }
  try {
    /** From metamask */
    const accs = await ethereum.request({'method': 'eth_requestAccounts'});
    console.log('Accounts: ', accs);
    return accs[0]
  } catch (err) {
    console.log(err)
  }
}