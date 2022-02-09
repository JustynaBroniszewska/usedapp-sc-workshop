import { expect } from 'chai'
import { deployContract, MockProvider } from 'ethereum-waffle'
import { constants, utils } from 'ethers'
import Dex from '../build/Dex.json'
import ERC20 from './CustomERC20.json'

describe('Dex', () => {
  it('constructor', async () => {
    const provider = new MockProvider()
    const [wallet] = provider.getWallets()
    const token0 = await deployContract(wallet, ERC20, ['token0', 'TK0', 18, utils.parseUnits('10000')])
    const token1 = await deployContract(wallet, ERC20, ['token1', 'TK1', 18, utils.parseUnits('10000')])
    const dex = await deployContract(wallet, Dex, [token0.address, token1.address])
    await token0.approve(dex.address, constants.MaxUint256)
    await token1.approve(dex.address, constants.MaxUint256)
    await dex.addLiquidity(utils.parseUnits('1'), utils.parseUnits('1'))
    expect(await token0.balanceOf(dex.address)).to.eq(utils.parseUnits('1'))
    expect(await token1.balanceOf(dex.address)).to.eq(utils.parseUnits('1'))
  })
})