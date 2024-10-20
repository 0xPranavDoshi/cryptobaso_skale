// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract dex {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public tokenABalance;
    uint256 public tokenBBalance;

    // Constructor to set the token addresses
    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    // Function to deposit TokenA into the contract
    function depositTokenA(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        // Update the contract's internal balance of TokenA
        tokenABalance += amount;
    }

    // Function to deposit TokenB into the contract
    function depositTokenB(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        // Update the contract's internal balance of TokenB
        tokenBBalance += amount;
    }

    // Function to swap TokenA for TokenB at a 1:1 ratio
    function swapToken(address input, uint256 amount) public returns (uint256) {
        require(amount > 0, "Amount must be greater than zero");
        require(input == address(tokenA) || input == address(tokenB), "Invalid token address");

        if (input == address(tokenA)) {
            require(tokenABalance >= amount, "Not enough TokenA in the contract");
            require(tokenBBalance >= amount, "Not enough TokenB in the contract");

            // Transfer TokenA from the sender to the contract
            tokenA.transferFrom(msg.sender, address(this), amount);

            // Transfer the same amount of TokenB from the contract to the sender
            tokenB.transfer(msg.sender, amount);

            // Update the internal balances after the swap
            tokenABalance += amount;
            tokenBBalance -= amount;
        } else {
            // Swap TokenB for TokenA
            require(tokenBBalance >= amount, "Not enough TokenB in the contract");
            require(tokenABalance >= amount, "Not enough TokenA in the contract");

            // Transfer TokenB from the sender to the contract
            tokenB.transferFrom(msg.sender, address(this), amount);

            // Transfer the same amount of TokenA from the contract to the sender
            tokenA.transfer(msg.sender, amount);

            // Update the internal balances after the swap
            tokenBBalance += amount;
            tokenABalance -= amount;
        }
        return amount;
    }

    function getPrice (address tokenIn, address tokenOut, uint256 fee, address recepient, uint256 amountIn, uint256 min, uint256 max) public returns (uint256) {
        return amountIn;
    }
}
