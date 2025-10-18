import { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';

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
  const [funds, setFunds] = useState([]);          // fundraiser addresses
  const [accounts, setAccounts] = useState([]);    // connected EOA(s)
  const [signer, setSigner] = useState(null);      // ethers.Signer for writes (if needed)

  // Read-only provider for public reads (fast, no wallet needed)
  const rpcProvider = useMemo(
    () => new ethers.JsonRpcProvider(ETHEREUM_URL),
    []
  );

  // Helper: get factory contract (read-only)
  const getFactoryRead = () =>
    new ethers.Contract(
      fundraiserFactoryContractAddr.address,
      fundraiserFactoryContractABI,
      rpcProvider
    );

  // Load fundraisers via read-only provider
  const loadFundraisers = async () => {
    try {
      const factory = getFactoryRead();
      // Solidity expects uint256; ethers v6 handles numbers, but BigInt is safest
      const list = await factory.fundraisers(10n, 0n);
      // list is address[]; store as-is
      setFunds(list);
    } catch (error) {
      console.error(error);
      alert('Failed to load contract or fundraisers (ethers).');
    }
  };

  // Connect wallet via BrowserProvider (MetaMask)
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not installed');
      return;
    }
    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      // request accounts (user prompt)
      await browserProvider.send('eth_requestAccounts', []);
      const s = await browserProvider.getSigner();
      const addr = await s.getAddress();
      setAccounts([addr]);
      setSigner(s);
    } catch (error) {
      console.error('User denied account access:', error);
    }
  };

  // Silent check on mount + initial data load
  useEffect(() => {
    loadFundraisers();

    const silentWalletCheck = async () => {
      if (!window.ethereum) return;
      try {
        const existing = await window.ethereum.request({ method: 'eth_accounts' });
        if (existing.length > 0) {
          // hydrate signer for convenience
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          const s = await browserProvider.getSigner();
          setSigner(s);
          setAccounts(existing);
        }
      } catch (error) {
        console.error('Silent wallet check failed:', error);
      }
    };

    silentWalletCheck();
  }, []); // mount only

  // Respond to account changes
  useEffect(() => {
    if (!window.ethereum) return undefined;

    const handleAccountsChanged = async (newAccounts) => {
      console.log('Account changed:', newAccounts);
      setAccounts(newAccounts || []);
      if (newAccounts && newAccounts.length > 0) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const s = await browserProvider.getSigner();
        setSigner(s);
      } else {
        setSigner(null);
      }
      // If you need: reload user-specific data here
      // await loadFundraisers();
    };

    const handleChainChanged = () => {
      // Best practice: refresh dapp state on chain changes
      // window.location.reload(); // or reload providers/contracts selectively
      loadFundraisers();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Fundraising Campaigns
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <Button onClick={connectWallet} variant="contained">
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
              <FundraiserCard
                fundraiser={fundraiser}
                connectedAccount={accounts[0]}
              // If your card will write to chain, pass signer too:
              // signer={signer}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Fundraising;
