import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import fs from "fs";

// 기본 .env
const envFile = fs.existsSync(".env") ? ".env" : ".env.dummy";
dotenv.config({ path: envFile });

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    // 실제 테스트넷은 필요 없지만 참고용으로 남겨둬도 OK
    // mumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [process.env.PRIVATE_KEY as string],
    // },
  },
};

export default config;
