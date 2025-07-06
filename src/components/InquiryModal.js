import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import API_BASE_URL from '../config'; // or './config' if in src/

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: 600 },
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh', // Limit height to prevent overflow
  overflowY: 'auto', // Enable vertical scrolling
};

export default function InquiryModal({ open, onClose, inquiryCartItems, onRemoveItem, onSubmitInquiry }) {
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!customerFirstName || !customerLastName || !customerEmail || inquiryCartItems.length === 0) {
      alert('Please fill in your first name, last name, and email, and add at least one product to your inquiry.');
      return;
    }
    console.log('Inquiry Cart Items:', inquiryCartItems);
    console.log('Inquiry Payload:', {
      customer_name: customerFirstName + ' ' + customerLastName,
      customer_email: customerEmail,
      customer_message: customerMessage,
      customer_address: customerAddress,
      inquiry_items: inquiryCartItems.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_sap: item.product_sap
      })),
    });
    // Call the onSubmitInquiry function passed from parent
    onSubmitInquiry({
      customer_name: customerFirstName + ' ' + customerLastName,
      customer_email: customerEmail,
      customer_message: customerMessage,
      customer_address: customerAddress,
      inquiry_items: inquiryCartItems.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_sap: item.product_sap
      })),
    });
    // Reset form fields after submission attempt (whether successful or not)
    setCustomerFirstName('');
    setCustomerLastName('');
    setCustomerEmail('');
    setCustomerMessage('');
    setCustomerAddress('');
    onClose(); // Close modal after submission
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="inquiry-modal-title"
      aria-describedby="inquiry-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="inquiry-modal-title" variant="h5" component="h2" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>
          PRODUCT INQUIRY
        </Typography>
        <Typography id="inquiry-modal-description" variant="body2" sx={{ mb: 2 }}>
          Please provide your contact details and message.
        </Typography>

        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerFirstName}
          onChange={(e) => setCustomerFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerLastName}
          onChange={(e) => setCustomerLastName(e.target.value)}
          required
        />
        <TextField
          label="Your Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
        <TextField
          label="Address (optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
        <TextField
          label="Message (optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={customerMessage}
          onChange={(e) => setCustomerMessage(e.target.value)}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ color: '#2f615d' }}>
          Products in Inquiry ({inquiryCartItems.length})
        </Typography>
        {inquiryCartItems.length > 0 ? (
          <List sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px', p: 1 }}>
            {inquiryCartItems.map((item, index) => (
              <ListItem
                key={item.product_id ? `${item.product_id}-${item.product_sap || index}` : index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(item.product_id, item.product_sap)}>
                    <DeleteIcon sx={{ color: '#ff6b6b' }} />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.product_name || 'Unknown Product'}
                  secondary={item.product_sap ? `SAP#: ${item.product_sap}` : 'No SAP #'}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            No products added to inquiry yet. Add products from the detail page.
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: '#2f615d',
            color: 'white',
            '&:hover': { bgcolor: '#244a47' },
            py: 1.5,
            borderRadius: '25px',
            fontWeight: 'bold',
          }}
          disabled={inquiryCartItems.length === 0} // Disable if no products
        >
          SEND INQUIRY
        </Button>
      </Box>
    </Modal>
  );
}
