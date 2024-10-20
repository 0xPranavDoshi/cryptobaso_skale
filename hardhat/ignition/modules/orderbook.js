const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

module.exports = buildModule("orderbook", (m) => {
  
  const orderbook = m.contract("Orderbook");

  return { orderbook };
});