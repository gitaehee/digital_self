async function main() {
    const QRPayment = await ethers.getContractFactory("QRPayment");
    const qrPayment = await QRPayment.deploy();
  
    console.log("Contract deployed to:", qrPayment.target);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  