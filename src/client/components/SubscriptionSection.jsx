import React, { useState } from 'react';
import { Grid } from '@mui/material';
import SubscriptionList from './SubscriptionList';
import SubscriptionForm from './SubscriptionForm';

const SubscriptionSection = () => {
  // State to manage the list of subscriptions
  const [subscriptions, setSubscriptions] = useState([]);
  // State to manage the form for adding/editing subscriptions
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    purchaseDate: '',
    endDate: '',
    amountCharged: '',
  });

  // local state to track which subscription we are editing/deleting
  const [editingIndex, setEditingIndex] = useState(null);

  // API call here to get all subscriptions and display then in subscriptions

  // Function to handle input changes in the form
  const handleInputChange = (field, value) => {
    // field is something like 'endDate', value is the value entered into the form
    setNewSubscription((input) => ({ ...input, [field]: value }));
  };

  // Function to handle adding a new subscription or updating an existing one
  const handleAddSubscription = () => {
    // Check if an edit is in progress
    if (editingIndex !== null) {
      // Update existing subscription if editing
      const updatedSubscriptions = [...subscriptions];
      // Replace the subscription at the specified index with the newSubscription data
      updatedSubscriptions[editingIndex] = newSubscription;
      // Set the subscriptions state with the updated data
      setSubscriptions(updatedSubscriptions);
      // Clear the editing state
      setEditingIndex(null);
    } else {
      // Add new subscription if not editing
      setSubscriptions((prevSubscriptions) => [
        ...prevSubscriptions,
        newSubscription,
      ]);
    }
    // Clear the form fields
    setNewSubscription({
      name: '',
      purchaseDate: '',
      endDate: '',
      amountCharged: '',
    });

    // API call here to add or update the subscription in the database
  };

  // Function to handle editing an existing subscription
  const handleEditSubscription = (index) => {
    // Retrieve the subscription data at the specified index
    const subscriptionToEdit = subscriptions[index];
    // Set the form fields to the data of the subscription being edited
    setNewSubscription({ ...subscriptionToEdit });
    // Set the index of the subscription being edited
    setEditingIndex(index);
    // Perform an API call here to edit/update the subscription in the database
  };

  // Function to handle deleting an existing subscription
  const handleDeleteSubscription = (index) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions.splice(index, 1);
    setSubscriptions(updatedSubscriptions);
    setEditingIndex(null);

    // API call here to delete the subscription
  };

  return (
    <Grid container spacing={3}>
      {/* Left side - Subscription List */}
      <Grid item xs={6}>
        <SubscriptionList
          subscriptions={subscriptions}
          onEdit={handleEditSubscription}
          onDelete={handleDeleteSubscription}
        />
      </Grid>

      {/* Right side - Add/Edit Subscription */}
      <Grid item xs={6}>
        <SubscriptionForm
          subscription={newSubscription}
          onInputChange={handleInputChange}
          onAddSubscription={handleAddSubscription}
          isEditing={editingIndex !== null}
        />
      </Grid>
    </Grid>
  );
};

export default SubscriptionSection;
