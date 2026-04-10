import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import {
  Card,
  Paper,
  Button,
  CardMedia,
  Container,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
} from '@mui/material';

const Receipts = () => {
  const [fund, setFund] = useState(null);
  const [date, setDate] = useState(null);
  const [money, setMoney] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      console.warn('location.state is null');
      return;
    }

    const { fund: newFund, date: newDate, money: newMoney } = location.state;

    const formattedDate = new Date(Number(newDate) * 1000);

    setFund(newFund);
    setDate(formattedDate.toLocaleString());
    setMoney(newMoney);
  }, [location.state]);

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Card sx={{ maxWidth: 500, mx: 'auto' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://cryptopepes.wtf/_next/static/media/pepeetherface.c7cd1aa5.svg"
              alt="pepe"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Thank you for your donation to {fund}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Date of Donation: {date}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Donation Value: ${parseFloat(money).toFixed(2)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
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
