import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

let web3Modal: Web3Modal | null = null;

if (typeof window !== "undefined" && !web3Modal) {
  web3Modal = new Web3Modal();
}

export const useWallet = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!web3Modal) return;

    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setProvider(provider);
      setAddress(userAddress);
    } catch (err) {
      console.error("지갑 연결 실패 또는 취소됨:", err);
      throw err; // 외부에서 catch 가능하게
    }
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (web3Modal?.cachedProvider) {
        try {
          await connectWallet();
        } catch (e) {
          console.warn("자동 연결 실패:", e);
        }
      }
    };
    autoConnect();
  }, []);

  return { connectWallet, provider, address };
};
