const connectWallet = async (): Promise<string> => {
  try {
    const result = await global.rabet.connect();

    return result.publicKey;
  } catch (e) {
    console.log(e);
    return '';
  }
};

export default connectWallet;
