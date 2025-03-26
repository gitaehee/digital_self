"use client";

import QRPayment from "@/components/QRPayment";

export default function PaymentPage() {
  const payeeAddress = "0x1234...ABCD"; // 가짜 판매자 주소
  const tokenAddress = "0xDEAD...BEEF"; // 가짜 토큰 주소
  const amount = 1.1; // 고정 금액

  return (
    <div className="page-container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>📦 결제 요청 QR 생성</h1>
        <p style={{ marginBottom: "1.5rem" }}>
          아래 QR 코드를 구매자에게 보여주세요.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
