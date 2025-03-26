//frontend/src/app/scan/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFakeApprove = () => {
    setLoading(true);
    setTimeout(() => {
      const newTx = {
        id: crypto.randomUUID(),
        amount: 1.1,
        to: "0x1234...ABCD",
        status: "성공",
        timestamp: new Date().toISOString(),
      };
      const prev = JSON.parse(localStorage.getItem("transactions") || "[]");
      localStorage.setItem("transactions", JSON.stringify([...prev, newTx]));
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
        <p>💸 금액: <strong>1.1 ETH</strong></p>
        <p>📤 받는 주소: 0x1234...ABCD</p>

        <button
          onClick={handleFakeApprove}
          disabled={loading}
          style={{ marginTop: "2rem" }}
        >
          {loading ? "⏳ 결제 승인 중..." : "✅ 결제 승인"}
        </button>
      </div>
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