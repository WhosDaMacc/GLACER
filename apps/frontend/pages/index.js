// apps/frontend/pages/index.js
import { useAccount, useContractWrite } from 'wagmi'
import ProfitPoolABI from '../../abis/ProfitPool.json'

export default function Home() {
  const { address } = useAccount()
  const { write: distribute } = useContractWrite({
    address: '0x...', // Your contract address
    abi: ProfitPoolABI,
    functionName: 'distribute',
  })

  return (
    <div>
      <h1>GLACER Profit Sharing</h1>
      <button onClick={() => distribute({ value: ethers.parseEther('0.1') })}>
        Distribute 0.1 ETH
      </button>
    </div>
  )
}