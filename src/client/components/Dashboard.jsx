import React from 'react';
import { Grid } from '@mui/material';
import SubscriptionChart from './SubscriptionChart';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionList from './SubscriptionList';

export default function Dashboard() {
  return (
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
  );
}
