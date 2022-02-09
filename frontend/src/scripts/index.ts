import { startGanache, privateKeys } from 'start-ganache'
import { Wallet } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { CustomERC20__factory } from './tokens/CustomERC20__factory'
import AMM from './AMM.json'
import Multicall from './Multicall.json'

async function start() {
  const port = 8545
    
  const provider = await startGanache(port)

  const wallet = new Wallet(privateKeys[0], provider)
  const token0 = await new CustomERC20__factory(wallet).deploy('token0', 'T0', 18, 1000)
  const token1 = await new CustomERC20__factory(wallet).deploy('token1', 'T1', 18, 1000)

  const amm = await deployContract(wallet, AMM, [token0.address, token1.address])
  const multicall = await deployContract(wallet, Multicall, [])

  console.log({
    privateKey: privateKeys[0],
    token0: token0.address,
    token1: token1.address,
    amm: amm.address,
    multicall: multicall.address,
  })
}

start()