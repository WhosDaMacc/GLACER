import { ethers } from 'ethers';
import { QuantumAudit } from '../encryption';

export class MetadataService {
  private contract: ethers.Contract;
  private provider: ethers.Provider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC!);
    this.contract = new ethers.Contract(
      process.env.METADATA_CONTRACT_ADDRESS!,
      MetadataRegistryABI,
      this.provider
    );
  }

  async trackFile(cid: string, quantumHash: string, tier: StorageTier) {
    const signer = new ethers.Wallet(process.env.SIGNER_KEY!, this.provider);
    const tx = await this.contract
      .connect(signer)
      .registerFile(cid, quantumHash, tier);
    
    await QuantumAudit.logEntry(`Registered ${cid}`, signer.privateKey);
    return tx.wait();
  }

  async verifyFile(cid: string, quantumHash: string) {
    return this.contract.verifyIntegrity(cid, quantumHash);
  }
}
import { ethers } from 'ethers';
import { QuantumAudit } from '../encryption';

export class MetadataService {
  private contract: ethers.Contract;
  private provider: ethers.Provider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC!);
    this.contract = new ethers.Contract(
      process.env.METADATA_CONTRACT_ADDRESS!,
      MetadataRegistryABI,
      this.provider
    );
  }

  async verifyFile(cid: string, quantumHash: string) {
    return this.contract.verifyIntegrity(cid, quantumHash);
  }
}