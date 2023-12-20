import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubscription,
  editSubscription,
} from '../store/slices/subscriptionSlice';

export default function SubscriptionForm() {
  const dispatch = useDispatch();
  const { isEditMode, selectedSubscription } = useSelector(
    (state) => state.subscriptionState
  );

  const [subscription, setSubscription] = useState({
    name: '',
    purchaseDate: '',
    endDate: '',
    amountCharged: '',
  });

  const handleSubmit = () => {
    if (isEditMode) {
      console.log('EDIT');
      dispatch(editSubscription(subscription));
    } else {
      console.log('NEW');
      dispatch(addSubscription(subscription));
    }
    resetSubscription();
  };

  const handleInputChange = (key, value) => {
    const clone = { ...subscription };
    clone[key] = value;
    setSubscription(clone);
  };

  const resetSubscription = () =>
    setSubscription({
      name: '',
      purchaseDate: '',
      endDate: '',
      amountCharged: '',
    });

  useEffect(() => {
    if (isEditMode) {
      setSubscription(selectedSubscription);
    } else {
      resetSubscription();
    }
  }, [isEditMode]);

  return (
    <div>
      {/* Display the title based on whether it's an edit or add operation */}
      <Typography variant='h5' gutterBottom color={'white'}>
        {isEditMode ? 'Edit Subscription' : 'Add Subscription'}
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          label='Subscription Name'
          fullWidth
          margin='normal'
          value={subscription.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <TextField
          label='Subscription Purchase Date'
          fullWidth
          margin='normal'
          value={subscription.purchaseDate}
          onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
        />
        <TextField
          label='Subscription End Date'
          fullWidth
          margin='normal'
          value={subscription.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
        />
        <TextField
          label='Amount Charged $'
          fullWidth
          margin='normal'
          value={subscription.amountCharged}
          onChange={(e) => handleInputChange('amountCharged', e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          style={{ marginTop: '10px' }}
        >
          {isEditMode ? 'Save Changes' : 'Add Subscription'}
        </Button>
      </Paper>
    </div>
  );
}
