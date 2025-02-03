import { MetadataRegistry, Storage } from '../blockchain';
import { ProfitPool } from '../rewards';

MetadataRegistry.on('TierUpdated', async (cid, newTier) => {
  const currentTier = await Storage.getCurrentTier(cid);
  
  if (currentTier !== newTier) {
    const fileData = await Storage.retrieve(cid);
    await Storage.moveToTier(cid, newTier, fileData);
    
    // Update profit-sharing weights
    await ProfitPool.adjustWeights(cid, getTierWeight(newTier));
  }
});

function getTierWeight(tier: string) {
  return {
    'HOT': 1.0,
    'WARM': 0.7,
    'COLD': 0.3
  }[tier];
}