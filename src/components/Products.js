import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import { getAssets } from '../api/getAssets';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAssets();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return data ? (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
