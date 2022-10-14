const { ethers } = require('hardhat');

async function main() {
  const CooperatorNFT = await ethers.getContractFactory('CooperatorNFT');
  const cooperatorNFT = await CooperatorNFT.deploy();

  await cooperatorNFT.deployed();

  console.log(`CooperatorNFT deployed to ${cooperatorNFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
