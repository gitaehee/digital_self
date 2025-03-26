//frontend/src/components/QRPayment.tsx

import { FC } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRPaymentProps {
  payeeAddress: string;
  tokenAddress: string;
  amount: number;
}

const QRPayment: FC<QRPaymentProps> = ({ payeeAddress, tokenAddress, amount }) => {
  const paymentData = {
    payeeAddress,
    tokenAddress,
    amount,
  };

  return (
    <div>
      <QRCodeSVG value={JSON.stringify(paymentData)} />
    </div>
  );
};

export default QRPayment; 