
const { network } = require('hardhat');
const tokenModule = require('../ignition/modules/token');
const dexModule = require('../ignition/modules/dex');
const orderbookModule = require('../ignition/modules/orderbook');
const hre = require('hardhat');

const getContractABI = async (contractName) => {
    const artifact = await hre.artifacts.readArtifact(contractName);
    return artifact.abi;
}

const CHECK_INTERVAL_MS = 5000;

async function deploy(contractModule, parameters) {
    //console.log(parameters)
    let contract = await hre.ignition.deploy(contractModule, parameters || {});
    //console.log(contract)
    return contract;
}

//you are on the wrong network and are accessing contract on wrong network


//it is running test order
//i forgot to print the address of all deployed contracts for you to use
//lemme do that

//1. deploy two token contracts
//2. deploy dex contract
//3. deploy orderbook contract
//4. mint coins for dex on both token contracts to provide liquidity
//5. mint coins for user for trading

async function main() { //did you chatGPT??? Ask it if why your code my be incorrect

    const accounts = await ethers.getSigners();
    const deployer = accounts[0].address;
    const PriceCheckerABI = await getContractABI("PriceChecker");

    let { token } = await deploy(tokenModule, { parameters: { token: { deployer } }})
    const token1 = token;
    let token2;
    token  = await deploy(tokenModule, { parameters: { token: { deployer } }})
    
    token2 = token.token;
    
    console.log(token2)
    const token1Addr = await token1.getAddress();
    const token2Addr = await token2.getAddress();
    console.log("Token1 address: ", token1Addr);
    console.log("Token2 address: ", token2Addr);
    
    const { dex } = await deploy(dexModule, { parameters: { dex: { token1Addr, token2Addr} }})
    const dexAddr = await dex.getAddress();
    console.log("Dex address: ", dexAddr);

    await token1.mint(dexAddr, 1000000);
    await token2.mint(dexAddr, 1000000);

    await token1.mint(accounts[0].address, 1000000);
    await token2.mint(accounts[0].address, 1000000);

    const { orderbook } = await deploy(orderbookModule)
    const orderbookAddr = await orderbook.getAddress();
    console.log("Orderbook address: ", orderbookAddr);
     // get contract that contains addresses of all open order contracts
    //const orderbookContract = await ethers.getContractAt(orderbookABI, orderbookAddr);

    await orderbook.createOrder(10, dexAddr, 5);

    //you don't executel ike normal transaction, it should literally be like the below line
    let orders = await orderbook.getOrderList(accounts[0].address)


    let orderpricechecker = await ethers.getContractAt(PriceCheckerABI, orders[0]);
    console.log("order price checker", orderpricechecker)
    await token1.approve(orders[0], 100);
    
    //await orderpricecheker.swapExactOutputSingle();
   
    const userListLength = await orderbook.amountOfUsers();

    while(true) {
        console.log("interval")
        for (let i = 0; i < userListLength; i++) {
        
            // get each order contract
            orderbook.getOrderList(await orderbook.users(i)).then((orderContractAddrs) => {
                orderContractAddrs.forEach(async (orderContractAddr) => {
                    try {
                        const priceChecker = await ethers.getContractAt(PriceCheckerABI, orderContractAddr);
                        console.log("Checking order: ", orderContractAddr);
                        let correctPrice = await priceChecker.checkPrice()
                        let fulfilled = await priceChecker.fulfilled()
                        if (correctPrice && !fulfilled) {
                            await priceChecker.swapExactOutputSingle()
                        
                            console.log("trade executed")
                            
                        }
                    } catch (e) {}
                });
            });
        }
        await new Promise(r => setTimeout(r, CHECK_INTERVAL_MS));
    }

}


// Call the main function and handle errors
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
