import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useInternetConnected = () => {
  const [isConnect, setIsConnect] = useState<boolean>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state:any) => {
      if (state.isInternetReachable === false) {
        setIsConnect(false);
      } else {
        setIsConnect(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return isConnect;
};

export default useInternetConnected;
