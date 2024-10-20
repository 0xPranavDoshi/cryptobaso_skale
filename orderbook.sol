pragma solidity ^0.8.0;

import "./PriceChecker.sol";


import "hardhat/console.sol";

contract Orderbook {

    struct orderList {
        uint256 amountOfOrders;
        address[] orderAddresses;
    }

    mapping (address => orderList) public userOrders;
    address[] public users;
    uint256 amountOfUsers;

    function createOrder(uint256 amountIn, 
            address dexAddr, uint256 split) public returns (address) {

        PriceChecker order = new PriceChecker(dexAddr, split, amountIn, amountIn, msg.sender);

        userOrders[msg.sender].orderAddresses.push(address(order));
        userOrders[msg.sender].amountOfOrders += 1;

        users.push(msg.sender);
        amountOfUsers += 1;

        return address(order);
    }

    function getOrderList(address user) public view returns (address[] memory){
        return userOrders[user].orderAddresses;
    }
}
