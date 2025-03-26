"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="page-container">
      <div className="card">
        <h1>✅ 결제가 완료되었습니다!</h1>
        <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
          거래 내역은 히스토리에서 확인할 수 있어요.
        </p>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/">
            <button>홈으로</button>
          </Link>
          <Link href="/history">
            <button>내역 보기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
