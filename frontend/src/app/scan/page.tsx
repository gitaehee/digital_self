//frontend/src/app/scan/page.tsx

"use client";
import { useWallet } from "@/hooks/useWallet";
import PaymentScanner from "@/components/PaymentScanner";

export default function ScanPage() {
  const { provider } = useWallet();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  return (
    <div className="page-container">
      <h1>QR 코드 스캔 및 결제</h1>
      {provider ? (
        <PaymentScanner provider={provider} contractAddress={contractAddress} />
      ) : (
        <p className="warning">⚠️ 먼저 지갑을 연결해주세요.</p>
      )}
    </div>
  );
}


const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  warning: {
    color: "#f59e0b",
  },
};