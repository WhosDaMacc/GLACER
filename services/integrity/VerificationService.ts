import { MetadataRegistry, QuantumHasher } from '../blockchain';
import { Storage } from '../storage';

export class VerificationService {
  async verifyFile(cid: string) {
    // Get on-chain metadata
    const [onChainHash, timestamp] = await Promise.all([
      MetadataRegistry.getQuantumHash(cid),
      MetadataRegistry.getTimestamp(cid)
    ]);

    // Get actual file hash
    const fileData = await Storage.get(cid);
    const actualHash = await QuantumHasher.hash(fileData);

    // Compare hashes
    if (onChainHash !== actualHash) {
      await this.handleTamper(cid);
      return false;
    }

    // Verify storage tier consistency
    const registeredTier = await MetadataRegistry.getTier(cid);
    const actualTier = await Storage.getTier(cid);
    
    return registeredTier === actualTier;
  }

  private async handleTamper(cid: string) {
    await MetadataRegistry.flagTampered(cid);
    await Storage.quarantine(cid);
    await Notifier.alertAdmins(`Tamper detected: ${cid}`);
  }
}