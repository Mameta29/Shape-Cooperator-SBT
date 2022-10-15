import { React } from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Discord from './assets/social-media-icons/discordLogo.png';
import Twitter from './assets/social-media-icons/twitterLogo.png';

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  const walletsOfCooperator = [
    '0xAd9b9Ad87A4d1EE7D52382A0400D79B3714806cE', // 1
    '0x1D73928555663200d3CABEf15e53C0a857397B36', // 2 あっきーさん
    '0xaB1839aD0a610aDBB60FF50843Ae860f4f25cdaC', // 3 ゆうちゃん
    // '0x4bB9aCE65677028B15a0a1ab189e72b8817e2a11', // 4
    // '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // 5
    // '0xfD8600dF5DD9fe11688109f35398c3B09703D153', // 6
    // '0xb4814B09A70F877F6200dc3e85078fAb972132D0', // 7
  ];

  async function connectAccount() {
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
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-around" width="40%" padding="0 75px"></Flex>
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Link href="https://twitter.com/Shape_ProjectJa">
          <Image src={Twitter} boxSize="42px" margin="0 10px" />
        </Link>
        <Link href="https://discord.gg/6EHz7d2y">
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
