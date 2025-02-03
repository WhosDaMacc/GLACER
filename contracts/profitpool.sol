// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

contract ProfitPool {
    address[] public shareholders;
    mapping(address => uint256) public shares;
    uint256 public totalShares;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function addShareholder(address _account, uint256 _shares) external {
        require(msg.sender == owner, "Only owner");
        shareholders.push(_account);
        shares[_account] = _shares;
        totalShares += _shares;
    }

    function distribute() external payable {
        require(msg.value > 0, "Send ETH to distribute");
        uint256 shareValue = msg.value / totalShares;
        for(uint256 i = 0; i < shareholders.length; i++) {
            payable(shareholders[i]).transfer(shareValue * shares[shareholders[i]]);
        }
    }
}
// contracts/ProfitPool.sol
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

contract ProfitPool {
    address[] public users;
    mapping(address => uint) public shares;
    uint public totalShares;
    
    // Add user with percentage share (1 = 1%)
    function addUser(address user, uint percentage) external {
        require(totalShares + percentage <= 100, "Exceeds 100%");
        users.push(user);
        shares[user] = percentage;
        totalShares += percentage;
    }

    // Distribute ETH to users proportionally
    function distribute() external payable {
        for(uint i; i < users.length; i++) {
            uint amount = (msg.value * shares[users[i]]) / 100;
            payable(users[i]).transfer(amount);
        }
    }
}