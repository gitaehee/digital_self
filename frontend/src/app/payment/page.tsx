"use client";

import { useState } from "react";
import QRPayment from "@/components/QRPayment";

export default function PaymentPage() {
  const [amount, setAmount] = useState<number>(1.1); // 입력된 금액
  const [input, setInput] = useState<string>("1.1"); // input 필드 문자열 상태

  const payeeAddress = "0x1234...ABCD";
  const tokenAddress = "0xDEAD...BEEF";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  return (
    <div className="page-container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>📦 결제 요청 QR 생성</h1>
        <p style={{ marginBottom: "1rem" }}>
          구매자에게 요청할 금액을 입력하세요.
        </p>

        <input
          type="number"
          step="0.01"
          min="0"
          value={input}
          onChange={handleInputChange}
          placeholder="ETH 금액 입력"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ddd",
            marginBottom: "1.5rem",
            width: "200px",
          }}
        />

        <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
          💰 입력된 금액: <strong>{amount} ETH</strong>
        </p>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          <QRPayment
            payeeAddress={payeeAddress}
            tokenAddress={tokenAddress}
            amount={amount}
          />
        </div>
      </div>
    </div>
  );
}
