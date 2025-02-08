// useFileMetadata.ts
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