// distribute.js
import { useContractWrite } from 'wagmi';
import ProfitPoolABI from '../../abis/ProfitPool.json';

export function useDistribute() {
  const { write: distribute } = useContractWrite({
    address: '0x...', // Your contract address
    abi: ProfitPoolABI,
    functionName: 'distribute',
  });

  return distribute;
}