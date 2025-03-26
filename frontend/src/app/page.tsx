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
    <div>
      <h1>홈페이지</h1>

      {!address ? (
        <>
          <button onClick={handleConnect} disabled={connecting}>
            {connecting ? "지갑 연결 중..." : "지갑 연결"}
          </button>
          {error && <p style={{ color: "salmon" }}>{error}</p>}
        </>
      ) : (
        <p> 지갑 주소: {address}</p>
      )}

      {provider ? (
        <div style={{ marginTop: "1rem" }}>
          <PaymentScanner provider={provider} contractAddress={contractAddress} />
        </div>
      ) : (
        <p>⚠️ 지갑을 연결하면 QR 스캐너가 활성화됩니다.</p>
      )}
    </div>
  );
}
