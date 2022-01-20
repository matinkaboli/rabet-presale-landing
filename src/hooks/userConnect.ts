import { useEffect, useState } from 'react';

import isConnectedStatus from 'src/utils/isConnected';
import connectWallet from 'src/utils/connectWallet';

const useConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const isConnectedResult = isConnectedStatus();

    if (isConnectedResult) {
      setTimeout(() => {
        (async () => {
          const publicKeyStr = await connectWallet();

          console.log(publicKeyStr);

          if (publicKeyStr) {
            setIsConnected(true);
            setPublicKey(publicKeyStr);
          }
        })();
      }, 200);
    }
  }, []);

  return {
    publicKey,
    isConnected,
  };
};

export default useConnect;
