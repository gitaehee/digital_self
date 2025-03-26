"use client";

import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  to: string;
  status: string;
  timestamp: string;
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h1>📜 결제 내역</h1>

        {transactions.length === 0 ? (
          <p>결제 내역이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {transactions.map((tx) => (
              <li
                key={tx.id}
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  background: "#f9fafb",
                }}
              >
                <p>💸 <strong>{tx.amount} ETH</strong></p>
                <p>📤 받는 주소: {tx.to}</p>
                <p>⏱️ {new Date(tx.timestamp).toLocaleString()}</p>
                <p
                  style={{
                    marginTop: "0.5rem",
                    color: tx.status === "성공" ? "#22c55e" : "#ef4444",
                  }}
                >
                  ● {tx.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
