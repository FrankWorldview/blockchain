import Web3 from 'web3';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import FundraiserCard from './FundraiserCard';

export const ETHEREUM_URL = 'http://127.0.0.1:8545';
import fundraiserFactoryContractABI from './abi/FundraiserFactory-abi.json';
import fundraiserFactoryContractAddr from './abi/FundraiserFactory-addr.json';

export { fundraiserFactoryContractABI, fundraiserFactoryContractAddr };

const Fundraising = () => {
  const [funds, setFunds] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const initWeb3 = async () => {
    try {
      const web3 = new Web3(ETHEREUM_URL);
      const instance = new web3.eth.Contract(
        fundraiserFactoryContractABI,
        fundraiserFactoryContractAddr.address
      );
      const newFunds = await instance.methods.fundraisers(10, 0).call();
      setFunds(newFunds);
    } catch (error) {
      console.error(error);
      alert('Failed to load Web3 or contract');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not installed');
      return;
    }
    try {
      const userAccounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccounts(userAccounts);
    } catch (error) {
      console.error('User denied account access:', error);
    }
  };

  // 🔍 Silent check on page load to see if wallet is already connected
  useEffect(() => {
    initWeb3();

    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const existingAccounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (existingAccounts.length > 0) {
            setAccounts(existingAccounts);
          }
        } catch (error) {
          console.error('Silent wallet check failed:', error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return undefined;

    const handleAccountsChanged = (newAccounts) => {
      console.log('Account changed:', newAccounts);
      setAccounts(newAccounts);
      // initWeb3(); // Optionally reload funds or reconnect contract
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // Cleanup listener on component unmount
    // Without the return function, you would be stacking up listeners every time the component mounts, which causes memory leaks
    // Because [] is passed:
    // The return function runs once when the component unmounts
    // It will not run on re-renders, because the effect never re-runs
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Fundraising Campaigns
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Button
            onClick={connectWallet}
            variant="contained"
          >
            {accounts.length > 0
              ? `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
              : 'Connect Wallet'}
          </Button>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {funds.map((fundraiser) => (
            <Grid
              gridColumn={{
                xs: 'span 12',
                sm: 'span 6',
                md: 'span 4',
                lg: 'span 3',
                xl: 'span 2',
              }}
              key={fundraiser}
            >
              <FundraiserCard fundraiser={fundraiser} connectedAccount={accounts[0]} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Fundraising;
