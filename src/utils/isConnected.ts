const isConnected = (): boolean => {
  const isConnectedData = global.sessionStorage.getItem('connect');

  return !!isConnectedData;
};

export default isConnected;
