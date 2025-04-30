// Import the big-integer library for handling large integers
import bigInt from 'big-integer';

// Import useLocation hook to access route state data
import { useLocation } from 'react-router';

// React hooks for state management and lifecycle effects
import { useState, useEffect } from 'react';

// MUI components for UI layout and styling
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

// Receipts component to display a donation receipt
const Receipts = (props) => {
  // State variables to store the fund name, date, and amount
  const [fund, setFund] = useState(null);
  const [date, setDate] = useState(null);
  const [money, setMoney] = useState(null);

  // Get the current location object, including route state
  const location = useLocation();

  // useEffect hook runs when the component mounts or when location.state changes
  useEffect(() => {
    // Destructure fund, date, and money from the state passed via route
    const { fund: newFund, date: newDate, money: newMoney } = location.state;
    console.log(newFund); // Debug: log the fund name

    // Convert UNIX timestamp (in seconds) to JavaScript Date (in milliseconds)
    const formattedDate = new Date(parseInt(bigInt(newDate).toJSNumber() * 1000, 10));

    // Set the received values into component state
    setFund(newFund);
    setDate(formattedDate.toString()); // Convert date object to string
    setMoney(newMoney);
  }, [location.state]);

  // Render the donation receipt UI
  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Card sx={{ maxWidth: 500, mx: 'auto' }}>
          <CardActionArea>
            {/* Display an image representing the donation/fund */}
            <CardMedia
              component="img"
              image="https://cryptopepes.wtf/_next/static/media/pepeetherface.c7cd1aa5.svg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Thank you for your donation to {fund}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Date of Donation: {date}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Donation Value: ${money}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* Placeholder share button */}
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Container>
  );
};

export default Receipts;
