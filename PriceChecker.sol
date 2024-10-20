// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8;
pragma abicoder v2;

import 'dex.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

import "hardhat/console.sol";

contract PriceChecker {
    dex public immutable swapRouter;
    uint public immutable split;
    uint256 public amountIn;
    uint256 public desiredOutput;
    uint256 public totalIn;
    
    address public TOKEN1; 
    address public TOKEN2;
    uint24 public constant poolFee = 3000; // Example: 0.3% fee pool

    address owner;

    constructor(address _swapRouter, uint256 _split, uint256 _amountIn, uint256 _desiredOutput, address user) {
        owner = user;
        totalIn = _amountIn;
        amountIn = _amountIn / _split;
        desiredOutput = _desiredOutput / _split;
        swapRouter = dex(_swapRouter);
        split = _split;
        TOKEN1 = address(swapRouter.tokenA());
        TOKEN2 = address(swapRouter.tokenB());
    }

    /// @notice This function checks if the amountIn can provide at least desiredOutput tokens.
    /// @return canSwap True if the amountIn is sufficient to get the desiredOutput, false otherwise.
    function checkPrice() external returns (bool canSwap) {

        // Call the `quoteExactInputSingle` method to estimate the output for the given amountIn
        uint256 estimatedOutput = swapRouter.getPrice(TOKEN1, TOKEN2, poolFee, address(this), amountIn, 0, 0);

        // Compare the estimated output with the desired output
        if (estimatedOutput >= desiredOutput) {
            return true; // AmountIn is sufficient for desiredOutput
        } else {
            return false; // AmountIn is not sufficient
        }
    }

    /// @notice swapExactOutputSingle swaps a minimum possible amount of DAI for a fixed amount of WETH.
    function swapExactOutputSingle() external returns (uint256 amountPayed) {
        require(totalIn >= amountIn, "All Order has been executed.");
        totalIn = totalIn - amountIn;

        // Transfer the specified amount of token1 to this contract.
        TransferHelper.safeTransferFrom(TOKEN1, owner, address(this), amountIn);

        // Approve the router to spend the specified `amountInMaximum` of DAI.
        TransferHelper.safeApprove(TOKEN1, address(swapRouter), amountIn);

        // Executes the swap returning the amountIn needed to spend to receive the desired amountOut.
        amountPayed = swapRouter.swapToken(TOKEN1, amountIn, poolFee, owner, desiredOutput, 0);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        if (amountPayed < amountIn) {
            TransferHelper.safeApprove(TOKEN1, address(swapRouter), 0);
            TransferHelper.safeTransfer(TOKEN1, owner, amountIn - amountPayed);
        }

        return amountPayed; // Return the actual amount spent
    }
}
