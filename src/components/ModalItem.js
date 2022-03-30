import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import getEvents from '../api/events';
import { FaEthereum } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 5000,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ModalItem({ asset_contract, token_id }) {
  const [data, setData] = useState(null);
  const [events, setEvents] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.opensea.io/api/v1/asset/${asset_contract.address}/${token_id}`
        );
        setData(response.data);
        const fetchedEvents = await getEvents(asset_contract.address, token_id);
        setEvents(fetchedEvents.asset_events);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log('events :>> ', events);
  return data ? (
    <div className={classes.root}>
      <Grid container spacing={2} width="100%">
        <Grid item sm={6} align-self="center">
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={data.image_url} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm={6} container>
          <Grid
            item
            xs
            container
            display="flex"
            direction="column"
            justifyContent="space-around"
            spacing={2}
          >
            <Grid item xs>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={4}
              >
                <Grid item>
                  <Avatar alt="Remy Sharp" src={data.creator.profile_img_url} />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="subtitle1">
                    {data.creator.user.username}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" gutterBottom>
                {data.description}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary">
                {data.description}
              </Typography> */}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                Price: <FaEthereum /> {events[0].ending_price / 10 ** 18} ETH
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
