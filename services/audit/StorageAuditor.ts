import { MetadataRegistry, Storage } from '../blockchain';

export class StorageAuditor {
  async crossCheckFiles() {
    const allFiles = await MetadataRegistry.getAllCIDs();
    
    for (const cid of allFiles) {
      const exists = await Storage.existsInTier(
        cid,
        await MetadataRegistry.getTier(cid)
      );
      
      if (!exists) {
        await this.handleMissingFile(cid);
      }
    }
  }

  private async handleMissingFile(cid: string) {
    const alternateTiers = ['HOT', 'WARM', 'COLD'].filter(
      t => t !== await MetadataRegistry.getTier(cid)
    );
    
    for (const tier of alternateTiers) {
      if (await Storage.existsInTier(cid, tier)) {
        await MetadataRegistry.correctTier(cid, tier);
        return;
      }
    }
    
    await MetadataRegistry.markLost(cid);
  }
}