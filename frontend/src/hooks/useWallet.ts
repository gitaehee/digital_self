import { useState, useEffect } from "react";
import { ethers } from "ethers";

const MOCK_MODE = true;

export const useWallet = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (MOCK_MODE) {
      setAddress("0x1234...ABCD");
      return;
    }

    // 실제 Web3Modal 연결 로직 (제거해도 됨)
  };

  useEffect(() => {
    if (MOCK_MODE) {
      setAddress("0x1234...ABCD");
    }
  }, []);

  return { connectWallet, provider, address };
};
