import React from 'react';
import { Grid } from '@mui/material';
import NavBar from './NavBar';
import SubscriptionChart from './SubscriptionChart';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionList from './SubscriptionList';
import '../index.css';

export default function Dashboard() {
  return (
    <div className='background'>
      <NavBar />
      <Grid container style={{ width: '90%', margin: 'auto' }}>
        <Grid item xs={12} lg={4}>
          <div style={{ padding: '1rem' }}>
            <SubscriptionList />
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={{ padding: '1rem' }}>
            <SubscriptionForm />
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div style={{ padding: '1rem' }}>
            <SubscriptionChart />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
