import { useState } from 'react';
import { ethers } from 'ethers';
import { QrReader } from 'react-qr-reader';

interface PaymentScannerProps {
  provider: ethers.BrowserProvider;
  contractAddress: string;
}

const PaymentScanner = ({ provider, contractAddress }: PaymentScannerProps) => {
  const [scanResult, setScanResult] = useState('');

  const handleScan = async (data: string | null) => {
    if (data) {
      setScanResult(data);
      const paymentInfo = JSON.parse(data);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        paymentInfo.tokenAddress,
        ['function approve(address spender, uint256 amount) public returns (bool)'],
        signer
      );
      
      // 승인 후 결제 트랜잭션 실행
      await tokenContract.approve(contractAddress, paymentInfo.amount);

      const paymentContract = new ethers.Contract(
        contractAddress,
        ['function makePayment(address payee, uint amount, address token) external'],
        signer
      );
      const tx = await paymentContract.makePayment(paymentInfo.payeeAddress, paymentInfo.amount, paymentInfo.tokenAddress);
      await tx.wait();

      alert('결제 완료!');
    }
  };

  return (
    <QrReader
      constraints={{ facingMode: 'environment' }}
      onResult={(result) => handleScan(result?.getText() ?? null)}
    />
  );
};

export default PaymentScanner;
