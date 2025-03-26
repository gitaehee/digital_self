"use client";
import QRPayment from "@/components/QRPayment";

const PaymentPage = () => {
  const payeeAddress = "0x판매자지갑주소";
  const tokenAddress = "0x토큰주소";
  const amount = 100; // 결제 금액 예시

  return (
    <div>
      <h1>결제 QR 코드 생성</h1>
      <QRPayment payeeAddress={payeeAddress} tokenAddress={tokenAddress} amount={amount} />
    </div>
  );
};

export default PaymentPage;
