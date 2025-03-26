"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* ✅ 고정된 헤더 */}
      <nav
        style={{
          background: "#f9fafb",
          padding: "1rem",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link href="/">🏠 홈</Link>
        <Link href="/payment">💳 Payment</Link>
        <Link href="/scan">📷 Scan</Link>
        <Link href="/history">📜 History</Link>
        <Link href="/success">✅ Success</Link>
      </nav>

      {/* ✅ 페이지 전환 애니메이션 */}
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {children}
       </motion.div>
    </>
  );
}
