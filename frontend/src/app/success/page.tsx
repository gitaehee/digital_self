// frontend/src/app/success/page.tsx

"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="page-container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "#10b981" }}>🎉 결제 완료!</h1>
        <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
          트랜잭션이 성공적으로 처리되었습니다.
        </p>

        <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link href="/">
            <button>🏠 홈으로</button>
          </Link>
          <Link href="/history">
            <button>📜 내역 보기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
