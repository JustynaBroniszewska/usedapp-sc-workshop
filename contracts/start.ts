import { startGanache, privateKeys, Multicall } from 'start-ganache'
import { Wallet, constants, utils } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import Dex from './build/Dex.json'
import ERC20 from './test/CustomERC20.json'

async function main() {
    const port = 8545
    
    const provider = await startGanache(port)

    const wallet = new Wallet(privateKeys[0], provider)
    await wallet.sendTransaction({ to: constants.AddressZero })
    const multicall = await deployContract(wallet, Multicall, [])
    const token0 = await deployContract(wallet, ERC20, ['token0', 'TK0', 18, utils.parseUnits('10000')])
    const token1 = await deployContract(wallet, ERC20, ['token1', 'TK1', 18, utils.parseUnits('10000')])
    const dex = await deployContract(wallet, Dex, [token0.address, token1.address])
    console.log('privateKey', privateKeys[0])
    console.log('multicall', multicall.address)
    console.log('token0', token0.address)
    console.log('token1', token1.address)
    console.log('dex', dex.address)
}
main()