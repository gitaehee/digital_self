"use client";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import PaymentScanner from "@/components/PaymentScanner";


const contractAddress = "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF"; // 실제 또는 더미 주소

export default function Home() {
  const { connectWallet, provider, address } = useWallet();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setConnecting(true);
    setError(null);
    try {
      await connectWallet();
    } catch (err: any) {
      const message = err?.message || err?.toString();
  
      if (message === "Modal closed by user") {
        setError("지갑 연결을 취소하셨습니다.");
        // console.log("사용자가 창을 닫았어요."); // 원하면 로그 유지 가능
      } else {
        setError("지갑 연결 중 오류가 발생했습니다.");
        console.error("예상치 못한 지갑 연결 오류:", err);
      }
    }
    setConnecting(false);
  };

  return (
    <div className="page-container">
      <h1>홈페이지</h1>
      {!address ? (
        <>
          <button onClick={handleConnect} disabled={connecting}>
            {connecting ? "지갑 연결 중..." : "지갑 연결"}
          </button>
          {error && <p className="warning">{error}</p>}
        </>
      ) : (
        <p className="address">🪙 지갑 주소: {address}</p>
      )}

      {provider ? (
        <div className="qr">
          <PaymentScanner provider={provider} contractAddress={contractAddress} />
        </div>
      ) : (
        <p className="warning">지갑을 연결하면 QR 스캐너가 활성화됩니다.</p>
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
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  error: {
    color: "salmon",
    marginTop: "0.5rem",
  },
  address: {
    fontWeight: "bold",
    marginTop: "1rem",
  },
  warning: {
    marginTop: "2rem",
    color: "#f59e0b",
  },
};