import { Router } from 'express';
import { StorageOrchestrator, VerificationService } from '../../services';

const router = Router();

router.post('/upload', async (req, res) => {
  try {
    const cid = await StorageOrchestrator.storeFile(req.file.buffer, req.user.address);
    res.json({ cid });
  } catch (error) {
    res.status(500).json({ error: 'Storage failed' });
  }
});

router.get('/file/:cid', async (req, res) => {
  const verified = await VerificationService.verifyFile(req.params.cid);
  if (!verified) return res.status(403).send('File compromised');
  
  const tier = await MetadataRegistry.getTier(req.params.cid);
  const file = await Storage.getByTier(req.params.cid, tier);
  res.send(file);
});

export default router;