// contracts/QuantumFileSharing.sol
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

contract QuantumFileSharing {
    struct Share {
        address owner;
        address recipient;
        bytes32 fileCID;
        uint256 expiry;
        bytes32 quantumHash;
    }
    
    mapping(bytes32 => Share) public shares;
    uint256 public shareFee = 0.0001 ether;

    event FileShared(
        bytes32 indexed shareId,
        address owner,
        bytes32 fileCID,
        uint256 expiry
    );

    function shareFile(
        bytes32 shareId,
        bytes32 fileCID,
        address recipient,
        uint256 expiry,
        bytes32 quantumHash
    ) external payable {
        require(msg.value >= shareFee, "Insufficient fee");
        require(shares[shareId].expiry == 0, "Share ID exists");

        shares[shareId] = Share({
            owner: msg.sender,
            recipient: recipient,
            fileCID: fileCID,
            expiry: block.timestamp + expiry,
            quantumHash: quantumHash
        });

        emit FileShared(shareId, msg.sender, fileCID, expiry);
    }

    function verifyAccess(bytes32 shareId) external view returns (bool) {
        Share memory s = shares[shareId];
        return s.expiry > block.timestamp && 
               (s.recipient == address(0) || s.recipient == msg.sender);
    }
}