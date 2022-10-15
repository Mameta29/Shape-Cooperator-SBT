import { ethers, BigNumber } from 'ethers';
import cooperatorNFT from './CooperatorNFT.json';
import './App.css';
import ShapeLogo from './assets/ShapeLogo.png';
import NFT from './assets/CooperatorNFTs/pink_予備.png';
import { Box, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

const cooperatorNFTAddress = '0x8b0452076AFAC438D318f9a08fca7c36F1Eb6678';

const MainMint = ({ accounts, setAccounts }) => {
  const mintAmount = 1;
  const isConnected = Boolean(accounts[0]);
  const [minted, setMinted] = useState(false);

  const mint = async () => {
    console.log('1' + minted);
    await handleMint();
    console.log('2' + minted);
    setMinted(true);
    console.log('3' + minted);
  };

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        cooperatorNFTAddress,
        cooperatorNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.03 * mintAmount).toString()),
        });
        console.log('response: ', response);
        setMinted(true);
      } catch (err) {
        console.log('error: ', err);
      }
    }
  }

  return (
    <div>
      <Flex justify="center" align="center" padding="30px">
        <Image src={ShapeLogo} boxSize="50px" margin="0 15px" />
        <h1 className="header gradient-text">Shape NFT</h1>
      </Flex>
      <p className="sub-text">Shapeにご協力くださりありがとうございます💫</p>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {isConnected ? (
          minted ? (
            <Box>
              <p className="mint-count">Minted✨</p>
              <p className="price-text">0.03 eth</p>
            </Box>
          ) : (
            <Box>
              <button className="cta-button mint-button" onClick={mint}>
                Mint Now
              </button>
              <p className="price-text">0.03 eth</p>
            </Box>
          )
        ) : (
          <p className="sub-text">登録したウォレットを接続してください。</p>
        )}
        <Image src={NFT} boxSize="450" rounded="md" />
      </Box>
    </div>
  );
};

export default MainMint;
