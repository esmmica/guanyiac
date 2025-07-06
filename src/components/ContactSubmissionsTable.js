import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import API_BASE_URL from '../config';

export default function ContactSubmissionsTable() {
  const [submissions, setSubmissions] = useState([]);
  const [viewRequest, setViewRequest] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/contact-submissions`)
      .then(res => setSubmissions(res.data))
      .catch(err => console.error('Error fetching submissions:', err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      axios.delete(`${API_BASE_URL}/api/contact-submissions/${id}`)
        .then(() => {
          setSubmissions(submissions.filter(sub => sub.id !== id));
        })
        .catch(err => console.error('Error deleting submission:', err));
    }
  };

  const handleView = (request) => {
    setViewRequest(request);
    setOpen(true);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Request</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map(sub => (
            <TableRow key={sub.id}>
              <TableCell>{sub.subject}</TableCell>
              <TableCell>
                {sub.request && sub.request.length > 30
                  ? (
                    <>
                      {sub.request.slice(0, 30)}...
                      <Tooltip title="View full request">
                        <IconButton size="small" onClick={() => handleView(sub.request)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )
                  : sub.request
                }
              </TableCell>
              <TableCell>{sub.first_name}</TableCell>
              <TableCell>{sub.last_name}</TableCell>
              <TableCell>{sub.email}</TableCell>
              <TableCell>{sub.phone}</TableCell>
              <TableCell>{new Date(sub.created_at).toLocaleString()}</TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => handleDelete(sub.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Full Request</DialogTitle>
        <DialogContent>
          <div style={{ whiteSpace: 'pre-wrap' }}>{viewRequest}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
