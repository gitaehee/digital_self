// frontend/src/app/scan/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number>(2.0); //현재 잔액
  const [amount, setAmount] = useState<number>(1.1); // QR에서 가져온 값이라고 가정

  useEffect(() => {
    const initialBalance = 2.0;
    localStorage.setItem("mockBalance", initialBalance.toString());
    setBalance(initialBalance);
  }, []);
  

  const isInsufficient = amount > balance;

  const handleFakeApprove = () => {
    setLoading(true);
    setTimeout(() => {
      const newTx = {
        id: crypto.randomUUID(),
        amount,
        to: "0x1234...ABCD",
        status: "성공",
        timestamp: new Date().toISOString(),
      };
      const prev = JSON.parse(localStorage.getItem("transactions") || "[]");
      localStorage.setItem("transactions", JSON.stringify([...prev, newTx]));

      // 💰 잔액 차감 제거 (리셋된 2.0 유지)
      // const newBalance = Math.max(0, balance - amount);
      // localStorage.setItem("mockBalance", newBalance.toString());

      setLoading(false);
      router.push("/success");
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>📷 QR 코드 스캔</h1>
        <p style={{ marginBottom: "1.5rem" }}>
          QR을 스캔한 결과, 아래 결제 정보가 확인되었습니다.
        </p>
        <p>💸 금액: <strong>{amount} ETH</strong></p>
        <p>📤 받는 주소: 0x1234...ABCD</p>

        <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "#6b7280" }}>
          💼 현재 잔액: {balance.toFixed(3)} ETH
        </p>

        {isInsufficient && (
          <p style={{ color: "#ef4444", marginTop: "1rem" }}>
            ❌ 잔액이 부족하여 결제를 진행할 수 없습니다.
          </p>
        )}

        <button
          onClick={handleFakeApprove}
          disabled={loading || isInsufficient}
          style={{ marginTop: "2rem" }}
        >
          {loading ? "⏳ 결제 승인 중..." : "✅ 결제 승인"}
        </button>
      </div>
    </div>
  );
}
