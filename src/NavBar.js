import { React } from 'react';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import Discord from './assets/social-media-icons/discordLogo.png';
import Twitter from './assets/social-media-icons/twitterLogo.png';
import { ethers } from 'ethers';
import cooperatorNFT from './CooperatorNFT.json';

const cooperatorNFTAddress = '0x8D8284451852f451CAEad8214b00E5CE49c8b94a';
const KEY_User1 = process.env.REACT_APP_KEY_USER1;
const KEY_User2 = process.env.REACT_APP_KEY_USER2;
const KEY_User3 = process.env.REACT_APP_KEY_USER3;
const KEY_User4 = process.env.REACT_APP_KEY_USER4;
const KEY_User5 = process.env.REACT_APP_KEY_USER5;
const KEY_User6 = process.env.REACT_APP_KEY_USER6;
const KEY_User7 = process.env.REACT_APP_KEY_USER7;
const KEY_User8 = process.env.REACT_APP_KEY_USER8;

const NavBar = ({
  accounts,
  setAccounts,
  // mintedAccount,
  // setMintedAccount,
  isMinted,
  setIsMinted,
}) => {
  const isConnected = Boolean(accounts[0]);
  const walletsOfCooperator = [
    KEY_User1,
    KEY_User2,
    KEY_User3,
    KEY_User4,
    KEY_User5,
    KEY_User6,
    KEY_User7,
    KEY_User8,
  ];

  async function connectAccount() {
    // console.log(walletsOfCooperator);
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // console.log('これがacountsじゃあ！', accounts);
      // 登録されたアドレス以外ウォレット接続できない
      walletsOfCooperator.forEach((wallet) => {
        if (accounts[0].toUpperCase() === wallet.toUpperCase()) {
          setAccounts(accounts);
        }
      });

      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          cooperatorNFTAddress,
          cooperatorNFT.abi,
          signer
        );
        try {
          // let wallet = new ethers.Wallet(
          //   process.env.REACT_APP_PRIVATE_KEY,
          //   provider
          // );
          // let balance = await wallet.getBalance();
          // console.log(balance);
          console.log(accounts[0]);

          const response = await contract.balanceOf(accounts[0]);
          console.log('response: ', response);
          // const response2 = await contract.ownerOf(1);
          // console.log('response2: ', response2);

          console.log(response._hex);

          if (response._hex !== '0x00') {
            console.log('いいとこはいってる！');
            setIsMinted(true);
          }
        } catch (err) {
          console.log('error: ', err);
        }
      }
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-around" width="40%" padding="0 75px"></Flex>
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Link href="https://twitter.com/Shape_ProjectJa">
          <Image src={Twitter} boxSize="42px" margin="0 10px" />
        </Link>
        <Link href="https://discord.gg/AYPU9Wwh">
          <Image src={Discord} boxSize="42px" margin="0 10px" />
        </Link>
        {isConnected ? (
          <Box margin="0 1px" color="white" fontWeight="bold">
            Connected
          </Box>
        ) : (
          <Button
            className="cta-button connect-wallet-button"
            onClick={connectAccount}
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
