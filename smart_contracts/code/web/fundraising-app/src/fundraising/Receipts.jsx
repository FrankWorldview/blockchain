import bigInt from 'big-integer';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

const Receipts = (props) => {
  const [fund, setFund] = useState(null);
  const [date, setDate] = useState(null);
  const [money, setMoney] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const { fund: newFund, date: newDate, money: newMoney } = location.state;
    console.log(newFund);

    const formattedDate = new Date(parseInt(bigInt(newDate).toJSNumber() * 1000, 10));

    setFund(newFund);

    setDate(formattedDate.toString());

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
