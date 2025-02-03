import { useContractRead } from 'wagmi';

export function useFileMetadata(cid: string) {
  const { data } = useContractRead({
    address: METADATA_CONTRACT_ADDRESS,
    abi: MetadataRegistryABI,
    functionName: 'getMetadata',
    args: [cid],
  });

  return {
    cid: data?.cid,
    owner: data?.owner,
    tier: data?.tier === 0 ? 'HOT' : data?.tier === 1 ? 'WARM' : 'COLD',
    lastVerified: data?.timestamp,
  };
}
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFileVerification(cid: string) {
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    async function verifyFile() {
      try {
        const response = await axios.get(`/api/verify/${cid}`);
        setVerificationResult(response.data);
      } catch (error) {
        console.error('Verification failed', error);
      }
    }

    verifyFile();
  }, [cid]);

  return verificationResult;
}