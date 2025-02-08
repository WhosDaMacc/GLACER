import { useAccount } from 'wagmi';
import { useDistribute } from '../hooks/distribute';

export default function Home() {
  const { address } = useAccount();
  const distribute = useDistribute();

  return (
    <div>
      <h1>GLACER Profit Sharing</h1>
      <button onClick={() => distribute({ value: ethers.parseEther('0.1') })}>
        Distribute 0.1 ETH
      </button>
    </div>
  );
}