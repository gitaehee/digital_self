//frontend/src/app/scan/page.tsx

"use client";
import { useWallet } from "@/hooks/useWallet";
import PaymentScanner from "@/components/PaymentScanner";

const ScanPage = () => {
  const { provider } = useWallet();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  return (
    <div>
      <h1>QR 코드 스캔 및 결제</h1>
      {provider && <PaymentScanner provider={provider} contractAddress={contractAddress} />}
    </div>
  );
};

export default ScanPage;
