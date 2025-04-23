import Web3 from 'web3';
import { useState } from 'react';

import { Container, Stack, TextField, Button, Typography, Paper } from '@mui/material';

import { fundraiserFactoryContractABI } from './index.jsx';
import { fundraiserFactoryContractAddr } from './index.jsx';

const CreateFundraiser = () => {
  const [fundName, setFundName] = useState('');
  const [fundURL, setFundURL] = useState('');
  const [fundImageURL, setFundImageURL] = useState('');
  const [fundDescription, setFundDescription] = useState('');
  const [fundBeneficiary, setFundBeneficiary] = useState('');

  const handleSubmit = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask not detected. Please install it to create a fundraiser.');
        return;
      }

      const web3 = new Web3(window.ethereum);

      // Prompt user to connect MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const instance = new web3.eth.Contract(
        fundraiserFactoryContractABI,
        fundraiserFactoryContractAddr.address
      );

      await instance.methods
        .createFundraiser(fundName, fundURL, fundImageURL, fundDescription, fundBeneficiary)
        .send({ from: accounts[0] });

      alert('Fundraiser is successfully created');
    } catch (error) {
      console.error('Fundraiser creation error:', error);
      alert('Failed to create fundraiser');
    }
  };

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create a Fundraising Campaign
        </Typography>

        <Stack spacing={3}>
          <TextField
            required
            label="Fund Name"
            fullWidth
            value={fundName}
            onChange={(e) => setFundName(e.target.value)}
          />
          <TextField
            required
            label="Website"
            fullWidth
            value={fundURL}
            onChange={(e) => setFundURL(e.target.value)}
          />
          <TextField
            required
            label="Image URL"
            fullWidth
            value={fundImageURL}
            onChange={(e) => setFundImageURL(e.target.value)}
          />
          <TextField
            required
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={fundDescription}
            onChange={(e) => setFundDescription(e.target.value)}
          />
          <TextField
            required
            label="Beneficiary Wallet Address"
            fullWidth
            value={fundBeneficiary}
            onChange={(e) => setFundBeneficiary(e.target.value)}
          />
          <Button onClick={handleSubmit} variant="contained" size="large" fullWidth>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CreateFundraiser;
