//frontend/src/app/payment/page.tsx

"use client";
import QRPayment from "@/components/QRPayment";

const PaymentPage = () => {
  const payeeAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // 가짜 주소
  const tokenAddress = "0xFAKEFAKEFAKEFAKEFAKEFAKEFAKEFAKEFAKEFAKE"; // 가짜 토큰 주소
  const amount = 100; // 결제 금액 예시

  return (
    <div className="page-container">
      <div className="card">
        <h1>결제 QR 코드 생성</h1>
        <div className="qr">
          <QRPayment
            payeeAddress={payeeAddress}
            tokenAddress={tokenAddress}
            amount={amount}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

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
};