// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

contract StorageSync {
    mapping(bytes32 => address) public cidToOwner;
    mapping(bytes32 => mapping(uint => bytes32)) public versionHistory;
    
    event FileVersioned(bytes32 indexed cid, uint version);
    
    function registerVersion(
        bytes32 cid,
        bytes32 prevCID,
        bytes32 quantumHash
    ) external {
        require(cidToOwner[prevCID] == msg.sender, "Not owner");
        
        uint version = ++versionCount[prevCID];
        versionHistory[prevCID][version] = cid;
        cidToOwner[cid] = msg.sender;
        
        emit FileVersioned(cid, version);
    }
}