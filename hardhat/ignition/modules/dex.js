const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");
const token = require("./token");

module.exports = buildModule("dex", (m) => {

    const token1Addr = m.getParameter("token1Addr");
  const token2Addr = m.getParameter("token2Addr");

  const dex = m.contract("dex", [token1Addr, token2Addr]);

  return { dex };
});