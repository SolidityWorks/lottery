export const readContract = async (func, args = []) => {
  try {
    const result = await func(...args);
    console.log('Reading...');
    // console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
}
export const writeContract = async (func, args = []) => {
  try {
    const result = await func(...args);
    console.log('Writing...');
    await result.wait() // wait is only for write actions
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
}
export const writePayableContract = async (func, val, args = [], setLoader, setSuccess) => {
  try {
    const result = await func(...args, { value: val });
    console.log('Writing...');
    setLoader(true);
    await result.wait() // wait is only for write actions
    setLoader(false);
    setSuccess('success');
    console.log(result);
    return result;
  } catch (e) {
    setLoader(false);
    setSuccess('failed');
    console.log(e);
  }
}