// FundraiserCard.jsx - Displays a fundraising campaign card with donation, withdrawal, and beneficiary features

import Web3 from 'web3';
import cc from 'cryptocompare';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// import { RouterLink } from 'src/routes/components';
import { RouterLink } from '/src/components/router-link';

import { ETHEREUM_URL } from './index.jsx';
import fundraiserContractABI from './abi/Fundraiser-abi.json';

const FundraiserCard = ({ fundraiser }) => {
  // State variables for Web3, accounts, contract instance, UI control, and contract data
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [newFundBeneficiary, setNewFundBeneficiary] = useState('');

  // Contract metadata and donation state
  const [contractData, setContractData] = useState({
    fundName: '',
    fundURL: '',
    fundImageURL: '',
    fundDescription: '',
    fundBeneficiary: '',
    fundTotalDonationsWei: '',
  });

  const [totalDonations, setTotalDonations] = useState(0);
  const [userDonations, setUserDonations] = useState({ values: [], dates: [] });
  const [donationAmount, setDonationAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [open, setOpen] = useState(false);

  // Convert USD donation amount to ETH using exchange rate
  const ethAmount = (donationAmount / exchangeRate || 0).toFixed(4);

  const init = async () => {
    try {
      let web3Instance;
      let userAccounts = [];

      if (window.ethereum) {
        // Silent check: won't pop up MetaMask
        userAccounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (userAccounts.length > 0) {
          web3Instance = new Web3(window.ethereum);
        } else {
          console.warn('MetaMask not connected. Using fallback provider.');
          web3Instance = new Web3(ETHEREUM_URL);
        }
      } else {
        console.warn('MetaMask not detected. Using fallback provider.');
        web3Instance = new Web3(ETHEREUM_URL);
      }

      const fundraiserContract = new web3Instance.eth.Contract(fundraiserContractABI, fundraiser);

      setWeb3(web3Instance);
      setAccounts(userAccounts);
      setContract(fundraiserContract);

      // Load contract metadata
      const [
        fundName,
        fundURL,
        fundImageURL,
        fundDescription,
        fundBeneficiary,
        fundTotalDonationsWei,
      ] = await Promise.all([
        fundraiserContract.methods.name().call(),
        fundraiserContract.methods.url().call(),
        fundraiserContract.methods.imageURL().call(),
        fundraiserContract.methods.description().call(),
        fundraiserContract.methods.beneficiary().call(),
        fundraiserContract.methods.totalDonations().call(),
      ]);

      setContractData({
        fundName,
        fundURL,
        fundImageURL,
        fundDescription,
        fundBeneficiary,
        fundTotalDonationsWei,
      });

      try {
        const prices = await cc.price('ETH', ['USD']); // Fetch the current exchange rate of ETH to USD
        setExchangeRate(prices.USD);
        const eth = web3Instance.utils.fromWei(fundTotalDonationsWei, 'ether');
        setTotalDonations((prices.USD * eth).toFixed(2));
      } catch (error) {
        console.error('Exchange rate fetch error:', error);
      }

      if (userAccounts.length > 0) {
        const userDonationsData = await fundraiserContract.methods
          .myDonations()
          .call({ from: userAccounts[0] });
        setUserDonations(userDonationsData);

        const owner = await fundraiserContract.methods.owner().call();
        setIsOwner(owner.toLowerCase() === userAccounts[0].toLowerCase());
      }
    } catch (error) {
      console.error(error);
      alert('Failed to initialise Web3 or contract');
    }
  };

  // Load fundraiser on mount or address change
  useEffect(() => {
    if (fundraiser) init();
  }, [fundraiser]);

  useEffect(() => {
    if (!window.ethereum) return undefined;

    const handleAccountsChanged = (newAccounts) => {
      console.log('Account changed:', fundraiser, newAccounts);
      // setAccounts(newAccounts);
      init();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle donation transaction
  const donateFunds = async () => {
    try {
      const ethTotal = parseFloat(donationAmount) / exchangeRate;
      const donation = web3.utils.toWei(ethTotal.toString(), 'ether');

      const gasEstimate = await contract.methods
        .donate()
        .estimateGas({ from: accounts[0], value: donation })
        .catch(() => 650000);

      await contract.methods
        .donate()
        .send({ from: accounts[0], value: donation, gas: gasEstimate });
      alert('Donation successful');
      setOpen(false);
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation failed');
    }
  };

  // Handle owner withdrawal
  const withdrawFunds = async () => {
    try {
      await contract.methods.withdraw().send({ from: accounts[0] });
      alert('Withdrawal successful');
      setOpen(false);
    } catch (error) {
      console.error('Withdrawal failed:', error);
      alert('Withdrawal failed');
    }
  };

  // Owner sets new beneficiary address
  const setBeneficiary = async () => {
    try {
      await contract.methods.setBeneficiary(newFundBeneficiary).send({ from: accounts[0] });
      alert('Beneficiary updated');
      setOpen(false);
    } catch (error) {
      console.error('Set beneficiary failed:', error);
      alert('Set beneficiary failed');
    }
  };

  // Render list of user's past donations
  const renderDonationsList = () => {
    if (!userDonations?.values?.length || !userDonations?.dates?.length) {
      return <p>No donations yet</p>;
    }

    return userDonations.values.map((value, i) => {
      const eth = web3.utils.fromWei(value, 'ether');
      const usd = (exchangeRate * eth).toFixed(2);
      return (
        <div key={i}>
          <Typography variant="body2" color="text.secondary">
            ${usd}
          </Typography>
          <Button variant="contained" color="primary">
            <Link
              component={RouterLink}
              // href="/dashboard/fundraising/receipts"
              href="/fundraising/receipts"
              state={{ fund: contractData.fundName, date: userDonations.dates[i], money: usd }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Request Receipt
            </Link>
          </Button>
        </div>
      );
    });
  };

  // Main render output
  return (
    <>
      {/* Donation dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Donate to {contractData.fundName}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <img
              src={contractData.fundImageURL}
              width="200"
              height="130"
              alt={contractData.fundName}
            />
            <Typography variant="body2">{contractData.fundDescription}</Typography>
            <FormControl>
              <Input
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="0.00"
              />
            </FormControl>
            <Typography variant="body2">ETH: {ethAmount}</Typography>
            <Button onClick={donateFunds} variant="contained">
              Donate
            </Button>
            <Typography variant="body2">My Donations</Typography>
            {renderDonationsList()}
            {isOwner && (
              <Box>
                <FormControl fullWidth>
                  <Input
                    value={newFundBeneficiary}
                    onChange={(e) => setNewFundBeneficiary(e.target.value)}
                    placeholder="New Beneficiary Address"
                  />
                </FormControl>
                <Button variant="contained" sx={{ mt: 2 }} onClick={setBeneficiary}>
                  Set Beneficiary
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isOwner && (
            <Button variant="contained" onClick={withdrawFunds}>
              Withdraw
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Fundraiser summary card */}
      <Card sx={{ maxWidth: 400 }}>
        {contractData.fundImageURL && (
          <CardMedia
            component="img"
            height="250"
            image={contractData.fundImageURL}
            alt="Fundraiser Image"
            onClick={handleOpen}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {contractData.fundName}
          </Typography>
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="body2" color="text.secondary">
              Description: {contractData.fundDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              URL: {contractData.fundURL}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Donations: ${totalDonations}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              Beneficiary Wallet Address: {contractData.fundBeneficiary}
            </Typography>
          </Stack>
          <Button onClick={handleOpen} variant="contained">
            More
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default FundraiserCard;
