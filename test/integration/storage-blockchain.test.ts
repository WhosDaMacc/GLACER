import { MetadataRegistry, StorageOrchestrator, VerificationService } from '../services';

describe('Storage-Blockchain Integration', () => {
  it('should sync metadata on file upload', async () => {
    const cid = await StorageOrchestrator.storeFile(Buffer.from('test file'), 'user1');
    const metadata = await MetadataRegistry.get(cid);
    expect(metadata.tier).toEqual('HOT');
    expect(await Storage.exists(cid)).toBeTruthy();
  });

  it('should detect and handle tampered files', async () => {
    const cid = await StorageOrchestrator.storeFile(Buffer.from('test file'), 'user1');
    await tamperFileInStorage(cid);
    const verified = await VerificationService.verifyFile(cid);
    expect(verified).toBeFalse();
    expect(await Storage.isQuarantined(cid)).toBeTruthy();
  });
});