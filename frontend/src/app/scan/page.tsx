"use client";
import { useWallet } from "@/hooks/useWallet";
import PaymentScanner from "@/components/PaymentScanner";

const ScanPage = () => {
  const { provider } = useWallet();
  const contractAddress = "0x배포된스마트컨트랙트주소";

  return (
    <div>
      <h1>QR 코드 스캔 및 결제</h1>
      {provider && <PaymentScanner provider={provider} contractAddress={contractAddress} />}
    </div>
  );
};

export default ScanPage;
