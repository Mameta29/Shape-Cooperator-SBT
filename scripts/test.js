const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CooperatorNFT', () => {
  it('Should return the balanceOf', async () => {
    const CooperatorNFT = await ethers.getContractFactory('CooperatorNFT');
    const cooperatorNFT = await CooperatorNFT.deploy();
    await cooperatorNFT.deployed();

    expect(
      await cooperatorNFT.balanceOf(
        '0x2184af4ffa9af93e99c6ac56c4507b03df8eb938'
      )
    ).to.equal(0);

    // const setGreetingTx = await cooperatorNFT.setGreeting('Hola, mundo!');

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
