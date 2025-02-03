import { useStorageMetrics } from '../hooks/useStorageMetrics';

export default function StorageDashboard() {
  const { data } = useStorageMetrics();
  
  return (
    <div className="dashboard">
      <TierDistributionChart 
        hot={data.hot}
        warm={data.warm}
        cold={data.cold}
      />
      
      <IntegrityHealth 
        verified={data.verifiedFiles}
        tampered={data.tamperedFiles}
      />
      
      <BlockchainSyncStatus 
        lastBlock={data.lastBlock}
        syncLag={data.syncLag}
      />
    </div>
  );
}