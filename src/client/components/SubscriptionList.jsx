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

const SubscriptionList = ({ subscriptions, onEdit, onDelete }) => (
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
              secondary={`Purchase Date: ${subscription.purchaseDate}, End Date: ${subscription.endDate}, Amount Charged: $ ${subscription.amountCharged}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={() => onEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge='end' onClick={() => onDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  </div>
);

export default SubscriptionList;
