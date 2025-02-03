import { Router } from 'express';
import { MetadataService } from '../../services/metadata/MetadataService';
import { StorageService } from '../../services/storage/StorageService';

const router = Router();
const metadataService = new MetadataService();
const storageService = new StorageService();

router.get('/verify/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const quantumHash = await storageService.getQuantumHash(cid);
    const isValid = await metadataService.verifyFile(cid, quantumHash);

    res.json({ cid, isValid });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

export default router;