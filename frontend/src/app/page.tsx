"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import PaymentScanner from "@/components/PaymentScanner";
import Link from "next/link";

interface Transaction {
  id: string;
  amount: number;
  to: string;
  status: string;
  timestamp: string;
}

const contractAddress = "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF"; // 실제 또는 더미 주소

export default function Home() {
  const { connectWallet, provider, address } = useWallet();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0.53); // 초기 mock 잔액
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 트랜잭션 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      const parsed = JSON.parse(stored) as Transaction[];
      setTransactions(parsed.slice(-3).reverse()); // 최신 3개
      // 🔻 총 결제 금액만큼 mock 잔액 차감
      const spent = parsed.reduce((sum, tx) => sum + tx.amount, 0);
      setBalance(Math.max(0, 0.53 - spent));
    }
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
        // console.log("사용자가 창을 닫았어요."); // 원하면 로그 유지 가능
      } else {
        setError("지갑 연결 중 오류가 발생했습니다.");
        console.error("예상치 못한 지갑 연결 오류:", err);
      }
    } finally {
      setConnecting(false); // 항상 false로 초기화
    }
  };
  

  const isConnected = Boolean(address && address !== "undefined" && address !== "");

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
                <p>
                  💸 <strong>{tx.amount} ETH</strong>
                </p>
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