// SubscriptionFormView.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';

const SubscriptionForm = ({
  subscription,
  onInputChange,
  onAddSubscription,
  isEditing,
}) => (
  <div>
    {/* Display the title based on whether it's an edit or add operation */}
    <Typography variant='h5' gutterBottom>
      {isEditing ? 'Edit Subscription' : 'Add Subscription'}
    </Typography>
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <TextField
        label='Subscription Name'
        fullWidth
        margin='normal'
        value={subscription.name}
        onChange={(e) => onInputChange('name', e.target.value)}
      />
      <TextField
        label='Subscription Purchase Date'
        fullWidth
        margin='normal'
        value={subscription.purchaseDate}
        onChange={(e) => onInputChange('purchaseDate', e.target.value)}
      />
      <TextField
        label='Subscription End Date'
        fullWidth
        margin='normal'
        value={subscription.endDate}
        onChange={(e) => onInputChange('endDate', e.target.value)}
      />
      <TextField
        label='Amount Charged $'
        fullWidth
        margin='normal'
        value={subscription.amountCharged}
        onChange={(e) => onInputChange('amountCharged', e.target.value)}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={onAddSubscription}
        style={{ marginTop: '10px' }}
      >
        {isEditing ? 'Save Changes' : 'Add Subscription'}
      </Button>
    </Paper>
  </div>
);

export default SubscriptionForm;
