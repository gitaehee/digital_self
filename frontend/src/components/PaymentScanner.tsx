import { useState } from 'react';
import { ethers } from 'ethers';
import { QrReader } from 'react-qr-reader';

interface PaymentScannerProps {
  provider: ethers.BrowserProvider;
  contractAddress: string;
}

const PaymentScanner = ({ provider, contractAddress }: PaymentScannerProps) => {
  const [scanResult, setScanResult] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (data: string | null) => {
    if (data && !scanResult) {
      setScanResult(data);
      try {
        const parsed = JSON.parse(data);
        setPaymentInfo(parsed);
      } catch (err) {
        setStatus("❌ 잘못된 QR 코드입니다.");
      }
    }
  };

  const handlePayment = async () => {
    if (!paymentInfo) return;
    setIsLoading(true);
    setStatus("💸 결제 진행 중...");

    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        paymentInfo.tokenAddress,
        ['function approve(address spender, uint256 amount) public returns (bool)'],
        signer
      );

      await tokenContract.approve(contractAddress, paymentInfo.amount);

      const paymentContract = new ethers.Contract(
        contractAddress,
        ['function makePayment(address payee, uint amount, address token) external'],
        signer
      );

      const tx = await paymentContract.makePayment(paymentInfo.payeeAddress, paymentInfo.amount, paymentInfo.tokenAddress);
      await tx.wait();

      setStatus("✅ 결제 완료되었습니다!");
    } catch (error: any) {
      console.error(error);
      setStatus("❌ 결제 실패: " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {!paymentInfo && (
        <>
          <h2>📷 QR 코드 스캔</h2>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result) => handleScan(result?.getText() ?? null)}
          />
        </>
      )}

      {paymentInfo && (
        <div style={{ marginTop: '1rem' }}>
          <h3>결제 정보 확인</h3>
          <ul>
            <li><strong>받는 지갑:</strong> {paymentInfo.payeeAddress}</li>
            <li><strong>토큰 주소:</strong> {paymentInfo.tokenAddress}</li>
            <li><strong>금액:</strong> {paymentInfo.amount}</li>
          </ul>
          <button onClick={handlePayment} disabled={isLoading}>
            {isLoading ? "처리 중..." : "결제하기"}
          </button>
        </div>
      )}

      {status && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>
      )}
    </div>
  );
};

export default PaymentScanner;
