// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import Link from "next/link";

interface Transaction {
  id: string;
  amount: number;
  to: string;
  status: string;
  timestamp: string;
}

const MOCK_INITIAL_BALANCE = 3.2;
const MOCK_MODE = true;

export default function Home() {
  const { connectWallet, address } = useWallet();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(MOCK_INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 🔥 거래 내역 초기 생성 + 잔액 계산
  useEffect(() => {
    const existing = localStorage.getItem("transactions");
  
    if (MOCK_MODE && !existing) {
      const mockTxs: Transaction[] = [
        {
          id: "mock1",
          amount: 1.25,
          to: "0xABCD123",
          status: "성공",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "mock2",
          amount: 0.8,
          to: "0xDEAD456",
          status: "성공",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
      ];
      localStorage.setItem("transactions", JSON.stringify(mockTxs));
    }
  
    const stored = localStorage.getItem("transactions");
    if (stored) {
      const parsed = JSON.parse(stored) as Transaction[];
      setTransactions(parsed.slice(-3).reverse());
    }
  
    // ✅ 잔액은 항상 2.0으로 고정
    const fixed = 2.0;
    setBalance(fixed);
    localStorage.setItem("mockBalance", fixed.toString());
  }, []);
  

  const handleConnect = async () => {
    setConnecting(true);
    setError(null);
    try {
      await connectWallet();
    } catch (err: any) {
      const message = err?.message || err?.toString();
      if (message === "Modal closed by user") {
        setError("지갑 연결을 취소하셨습니다.");
      } else {
        setError("지갑 연결 중 오류가 발생했습니다.");
      }
    } finally {
      setConnecting(false);
    }
  };

  const isConnected = Boolean(address);

  return (
    <div className="page-container">
      <div className="card">
        <h1>🧾 내 지갑 대시보드</h1>

        {!isConnected ? (
          <>
            <button onClick={handleConnect} disabled={connecting}>
              {connecting ? "🔄 지갑 연결 중..." : "지갑 연결"}
            </button>
            {error && <p className="warning">{error}</p>}
          </>
        ) : (
          <>
            <p className="address">🪙 지갑 주소: {address}</p>
            <p style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
              💰 <strong>{balance.toFixed(3)} ETH</strong> (가상 잔액)
            </p>

            <div style={{ marginTop: "2rem" }}>
              <Link href="/payment">
                <button>➕ 결제 QR 생성하러 가기</button>
              </Link>
            </div>
          </>
        )}
      </div>

      {isConnected && transactions.length > 0 && (
        <div className="card">
          <h2>🕓 최근 결제 내역</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {transactions.map((tx) => (
              <li key={tx.id} style={styles.txItem}>
                <p>💸 <strong>{tx.amount} ETH</strong></p>
                <p>📤 받는 주소: {tx.to}</p>
                <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <Link href="/history">전체 보기 →</Link>
          </div>
        </div>
      )}
      

    </div>
  );
}



const styles = {
  txItem: {
    marginBottom: "1.2rem",
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    background: "#f9fafb",
  },
};
