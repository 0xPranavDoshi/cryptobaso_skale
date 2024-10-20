"use client";

import { SecondaryButton } from "@/app/ui/button";
import { useState } from "react";
import { ethers } from "ethers";
import { CoinType } from "@/app/models/coin";

const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const TradeCard = ({ coin }: { coin: CoinType }) => {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<number>(0);
  const [splits, setSplits] = useState<number>(1);

  const transferFunds = async ({
    amount,
    coin,
  }: {
    amount: number;
    coin: CoinType;
  }) => {
    try {
      // Check if window.ethereum is available
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Get the first account
        const account = accounts[0];

        // Create a Web3Provider instance
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer
        const signer = provider.getSigner();

        console.log("Connected wallet address:", account);

        // You can now use the signer for transactions
        // For example: const tx = await signer.sendTransaction({...});

        // Check if the wallet is connected to Europa DeFi Hub SKALE network
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const europaDeFiHubChainId = "0x561bf78b"; // Chain ID for Europa DeFi Hub

        if (chainId !== europaDeFiHubChainId) {
          try {
            // Request to switch to Europa DeFi Hub network
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: europaDeFiHubChainId }],
            });
            console.log("Switched to Europa DeFi Hub network successfully");
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: europaDeFiHubChainId,
                      chainName: "Europa DeFi & Liquidity Hub",
                      nativeCurrency: {
                        name: "sFUEL",
                        symbol: "sFUEL",
                        decimals: 18,
                      },
                      rpcUrls: [
                        "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
                      ],
                      blockExplorerUrls: [
                        "https://juicy-low-small-testnet.explorer.testnet.skalenodes.com",
                      ],
                    },
                  ],
                });
                console.log("Europa DeFi Hub network added successfully");
              } catch (addError) {
                console.error(
                  "Failed to add Europa DeFi Hub network:",
                  addError
                );
              }
            } else {
              console.error(
                "Failed to switch to Europa DeFi Hub network:",
                switchError
              );
            }
          }
        } else {
          console.log("Already connected to Europa DeFi Hub network");
        }

        // TODO: Implement the transfer funds logic
        // Transfer funds to smart contract address
        const smartContractAddress =
          "0xDfCcc9567378aBa81B74ece63ba9bAD017bAF65d";

        // Create a contract instance for USDC
        const usdcContractAddress =
          "0x6CE77Fc7970F6984eF3E8748A3826972Ec409Fb9";
        const usdcContract = new ethers.Contract(
          usdcContractAddress,
          ERC20_ABI,
          signer
        );

        const amountInUsdc = (amount * coin.price).toFixed(6);

        console.log("amountInUsdc", amountInUsdc);

        const amountInWei = ethers.utils.parseUnits(amountInUsdc.toString(), 6);

        const tx = await usdcContract.transfer(
          smartContractAddress,
          amountInWei
        );

        await tx.wait();

        console.log("Transfer successful:", tx.hash);
      } else {
        console.error("Please install MetaMask!");
        return null;
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      return null;
    }
  };

  return (
    <div className="rounded-lg w-1/3 p-8 bg-white/[.02] shadow-lg shadow-[rgba(134, 134, 134, 0.25)] border-white/[.1] border">
      <div className="flex w-full items-start justify-between h-full flex-col gap-2">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-xl mb-4 font-semibold font-robotoMono">
            Make a Trade
          </h1>
          <p className="text-light text-sm font-inriaSans">
            Choose order type.
          </p>
          <div className="flex items-center w-full">
            <TradeButton
              type="buy"
              isActive={tradeType === "buy"}
              onClick={() => setTradeType("buy")}
            />
            <TradeButton
              type="sell"
              isActive={tradeType === "sell"}
              onClick={() => setTradeType("sell")}
            />
          </div>

          <div className="flex mt-4 flex-col w-full gap-2">
            <p className="text-light text-sm font-inriaSans">
              Amount of {coin.symbol}.
            </p>
            <div className="flex items-center justify-between gap-2">
              <input
                type="number"
                className="w-full bg-white/[.02] border border-white/[.1] rounded-lg p-2 text-white font-inriaSans focus:outline-none focus:ring-2 focus:ring-[#63B9B8]"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <span className="text-light text-sm font-inriaSans ml-2">
                {coin.symbol}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-light text-sm font-inriaSans">
              Total:{" "}
              <span className="font-semibold">
                ${(amount * coin.price).toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex mt-4 flex-col w-full gap-2">
            <p className="text-light text-sm font-inriaSans">
              Number of transaction splits.
            </p>
            <div className="flex items-center justify-between gap-2">
              <input
                type="number"
                defaultValue={1}
                className="w-full bg-white/[.02] border border-white/[.1] rounded-lg p-2 text-white font-inriaSans focus:outline-none focus:ring-2 focus:ring-[#63B9B8]"
                value={splits}
                onChange={(e) => setSplits(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <SecondaryButton
          text="Trade"
          onClick={() => transferFunds({ amount, coin })}
          fullWidth
        />
      </div>
    </div>
  );
};

const TradeButton = ({
  type,
  isActive,
  onClick,
}: {
  type: "buy" | "sell";
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`${type === "sell" ? "-ml-6" : ""}
              w-full capitalize border cursor-pointer px-auto rounded-xl font-inriaSans py-2
              ${isActive ? "z-10 text-black" : "z-0 text-white"}
              transition-colors duration-0 ease-in-out
              ${
                isActive
                  ? "border-[#63B9B8] bg-button-primary"
                  : "border-[#63B9B8]/[.50] hover:bg-[#63B9B8]/[.15]"
              }
            `}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default TradeCard;
