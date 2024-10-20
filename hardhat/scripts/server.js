
const { network } = require('hardhat');


// Load the existing contract using ethers.getContractAt

const contractABI = "..."
const contractAddress = "0x1234..."


async function main() {

    
    // get mugdha dex address
    const exampleDEX = await ethers.getContractAt(contractABI, contractAddress);

    // get contract that contains addresses of all open order contracts
    const orderbookContract = await ethers.getContractAt(contractABI, contractAddress);

    const userList = orderbookContract.users();

    for (let i = 0; i < userList.length; i++) {
    
        // get each order contract
        orderbookContract.userOrders(userList[i]).then((orderContracts) => {
            orderContracts.forEach(async (orderContract) => {
                const order = await ethers.getContractAt(contractABI, orderContract);

                //order get price

                //if true, execute order

                console.log(order);
            });
        });
    }
    
    
    

}
