// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract QRPayment {
    event PaymentDone(address payer, address payee, uint amount, address token, uint timestamp);

    function makePayment(address payee, uint amount, address token) external {
        require(IERC20(token).transferFrom(msg.sender, payee, amount), "Payment failed");
        emit PaymentDone(msg.sender, payee, amount, token, block.timestamp);
    }
}
