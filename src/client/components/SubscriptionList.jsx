import React from 'react';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSubscription,
  toggleIsEditMode,
} from '../store/slices/subscriptionSlice';

export default function SubscriptionList() {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.subscriptionState);
  const onEdit = (subscription) => {
    dispatch(
      toggleIsEditMode({
        isEditMode: true,
        subscriptionId: subscription.sub_id,
      })
    );
  };

  const onDelete = (subscription) => {
    dispatch(deleteSubscription(subscription.sub_id));
  };
  return (
    <div>
      <Typography variant='h5' gutterBottom>
        Subscription List
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <List>
          {subscriptions.map((subscription, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={subscription.name}
                secondary={`Purchase Date: ${subscription.purchaseDate} | End Date: ${subscription.endDate} | Amount Charged: $ ${subscription.amountCharged}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={() => onEdit(subscription)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge='end' onClick={() => onDelete(subscription)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}
