import { ethers, BigNumber } from 'ethers';
import cooperatorNFT from './CooperatorNFT.json';
import './App.css';
import ShapeLogo from './assets/ShapeLogo.png';
import NFT from './assets/CooperatorNFTs/pink_予備.png';
import { Box, Flex, Image } from '@chakra-ui/react';
// import { nft1 } from './assets/NFTmetadata/CooperatorNFT_1.json';
// import { nft2 } from './assets/NFTmetadata/CooperatorNFT_2.json';
// import { nft3 } from './assets/NFTmetadata/CooperatorNFT_3.json';
// import { nft4 } from './assets/NFTmetadata/CooperatorNFT_4.json';
// import { nft5 } from './assets/NFTmetadata/CooperatorNFT_5.json';
// import { nft6 } from './assets/NFTmetadata/CooperatorNFT_6.json';
// import { nft7 } from './assets/NFTmetadata/CooperatorNFT_7.json';

const cooperatorNFTAddress = '0x744bb5FB0a184FEec3dCe93a0dDac40De19050A4';
// const fs = require('fs');
// const json1 = fs.readFileSync('./assets/NFTmetadata/CooperatorNFT_1.json');
// const data1 = JSON.parse(json1);

const MainMint = ({ accounts, setAccounts }) => {
  const mintAmount = 1;
  const isConnected = Boolean(accounts[0]);

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
        // console.log('dataには〜〜〜', data1);
        const response = await contract.mint(
          BigNumber.from(mintAmount),
          // 'ipfs://bafybeiaz75nmds4mv2ehmmcabdzvzej2pm5bxk4arnduzcbjp5szhig2e4/6.json',
          {
            value: ethers.utils.parseEther((0.03 * mintAmount).toString()),
          }
        );
        console.log('response: ', response);
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
          <Box>
            <button className="cta-button mint-button" onClick={handleMint}>
              Mint Now
            </button>
            <p className="price-text">0.03 eth</p>
          </Box>
        ) : (
          <p className="sub-text">登録したウォレットを接続してください。</p>
        )}
        <Image src={NFT} boxSize="450" rounded="md" />
      </Box>
    </div>
  );
};

export default MainMint;

// contract 変えたのでデプロイする○
// どうせデプロイするなら譲渡不可にしてから○
// NFTのmintをできるように⇨７つのアカウントとjsonを紐づけてしまう？
// それをするならmappng 画像表示する際にもそこからデータをもってこれないか
