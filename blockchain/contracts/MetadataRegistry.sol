// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

contract MetadataRegistry {
    struct FileMetadata {
        bytes32 cid;            // IPFS Content ID
        bytes32 quantumHash;    // Falcon-512 hash of encrypted data
        uint256 timestamp;
        address owner;
        address[] accessList;
        StorageTier tier;
    }
    
    enum StorageTier { HOT, WARM, COLD }
    
    mapping(bytes32 => FileMetadata) private _metadata;
    mapping(address => bytes32[]) private _userFiles;
    
    event FileRegistered(bytes32 indexed cid, address owner);
    event MetadataUpdated(bytes32 indexed cid, StorageTier newTier);

    function registerFile(
        bytes32 cid,
        bytes32 quantumHash,
        StorageTier tier
    ) external {
        FileMetadata storage meta = _metadata[cid];
        meta.cid = cid;
        meta.quantumHash = quantumHash;
        meta.tier = tier;
        meta.owner = msg.sender;
        meta.timestamp = block.timestamp;
        
        _userFiles[msg.sender].push(cid);
        emit FileRegistered(cid, msg.sender);
    }

    function verifyIntegrity(bytes32 cid, bytes32 quantumHash) 
        external view returns (bool) {
        return _metadata[cid].quantumHash == quantumHash;
    }
}