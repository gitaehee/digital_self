// frontend/src/components/QRPayment.tsx

"use client";

import { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";

interface Props {
  payeeAddress: string;
  tokenAddress: string;
  amount: number;
}

export default function QRPayment({ payeeAddress, tokenAddress, amount }: Props) {
  const qrRef = useRef<HTMLDivElement>(null);

  const qrData = JSON.stringify({
    to: payeeAddress,
    token: tokenAddress,
    amount,
  });

  const downloadQR = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const link = document.createElement("a");
      link.download = `qr_payment_${amount}ETH.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
  <div
    ref={qrRef}
    style={{
      display: "inline-block",
      padding: "1rem",
      background: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    }}
  >
    <QRCodeSVG value={qrData} size={200} />
  </div>

  <div style={{ marginTop: "1rem" }}>
    <button
      onClick={downloadQR}
      style={{
        padding: "0.6rem 1.5rem",
        fontSize: "1rem",
        borderRadius: "0.5rem",
        background: "#6366f1",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      ⬇️ QR 다운로드
    </button>
  </div>
</div>
  );
}
