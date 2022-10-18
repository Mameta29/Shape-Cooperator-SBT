import { ethers, BigNumber } from 'ethers';
import cooperatorNFT from './CooperatorNFT.json';
import './App.css';
import NFT from './assets/CooperatorNFTs/pink_予備.png';
import { Box, Flex, Image } from '@chakra-ui/react';

const cooperatorNFTAddress = '0x8D8284451852f451CAEad8214b00E5CE49c8b94a';
const amountOfMint = 0;

const MainMint = ({
  accounts,
  setAccounts,
  // mintedAccount,
  // setMintedAccount,
  isMinted,
  setIsMinted,
}) => {
  const mintAmount = 1;
  const isConnected = Boolean(accounts[0]);

  // const mint = async () => {
  //   // console.log('1' + isMinted);
  //   await handleMint();
  //   // console.log('2' + isMinted);
  //   // setIsMinted(true);
  //   // console.log('3' + isMinted);
  // };

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const mint_accounts = await window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // });
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
        amountOfMint++;
        setIsMinted(true);
      } catch (err) {
        console.log('error: ', err);
      }
    }
  }

  return (
    <div>
      <Flex justify="center" align="center" padding="30px">
        <h1 className="header gradient-text">Shape NFT</h1>
      </Flex>
      <p className="sub-text">Shapeにご協力くださりありがとうございます💫</p>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {isConnected ? (
          isMinted ? (
            <Box>
              <p className="minted-text">Minted✨</p>
              <a
                href="https://testnets.opensea.io/collection/shapecooperatornft-50zrsrce1j"
                className="price-text"
              >
                OpenSeaで見てみてね！
              </a>
              <p className="price-text">0.03 eth</p>
            </Box>
          ) : (
            <Box>
              <button className="cta-button mint-button" onClick={handleMint}>
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
