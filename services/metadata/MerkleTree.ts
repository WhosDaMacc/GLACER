import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'ethers';

export class MetadataMerkleTree {
  private tree: MerkleTree;

  constructor(metadata: string[]) {
    const leaves = metadata.map(m => keccak256(m));
    this.tree = new MerkleTree(leaves, keccak256, { sort: true });
  }

  getRoot(): string {
    return this.tree.getHexRoot();
  }

  getProof(metadata: string): string[] {
    return this.tree.getHexProof(keccak256(metadata));
  }

  verify(metadata: string, proof: string[]): boolean {
    return this.tree.verify(proof, keccak256(metadata), this.getRoot());
  }
}
import { MetadataContract } from '../blockchain/MetadataContract';

export class MetadataService {
  async updateAccess(cid: string, addresses: string[]) {
    const proof = this.merkleTree.getProof(addresses);
    await MetadataContract.setAccessList(cid, proof);
  }
}