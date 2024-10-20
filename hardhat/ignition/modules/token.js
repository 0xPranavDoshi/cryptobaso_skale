const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("token", (m) => {
  
    const deployer = m.getParameter("deployer");
    //console.log(deployer)
    const token = m.contract("token", [deployer]);
    return { token };
});