import { React } from 'react';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import Discord from './assets/social-media-icons/discordLogo.png';
import Twitter from './assets/social-media-icons/twitterLogo.png';

const KEY_User1 = process.env.REACT_APP_KEY_USER1;
const KEY_User2 = process.env.REACT_APP_KEY_USER2;
const KEY_User3 = process.env.REACT_APP_KEY_USER3;
const KEY_User4 = process.env.REACT_APP_KEY_USER4;
const KEY_User5 = process.env.REACT_APP_KEY_USER5;
const KEY_User6 = process.env.REACT_APP_KEY_USER6;
const KEY_User7 = process.env.REACT_APP_KEY_USER7;

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  const walletsOfCooperator = [
    KEY_User1,
    KEY_User2,
    KEY_User3,
    KEY_User4,
    KEY_User5,
    KEY_User6,
    KEY_User7,
  ];

  async function connectAccount() {
    console.log(walletsOfCooperator);
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // console.log('これがacountsじゃあ！', accounts);
      // 登録されたアドレス以外ウォレット接続できない
      walletsOfCooperator.forEach((wallet) => {
        console.log(wallet);
        if (accounts[0].toUpperCase() === wallet.toUpperCase()) {
          setAccounts(accounts);
        }
      });
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
