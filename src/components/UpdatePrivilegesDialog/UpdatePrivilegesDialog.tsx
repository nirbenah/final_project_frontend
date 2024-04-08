import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';

interface UpdatePrivilegesDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (username: string, permission: string) => void;
}

const UpdatePrivilegesDialog: React.FC<UpdatePrivilegesDialogProps> = ({ open, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [permission, setPermission] = useState('');

  const handleSubmit = () => {
    // Check if username and level are not empty
    if (username.trim() !== '' && permission.trim() !== '') {
      onSubmit(username, permission );
      setUsername('');
      setPermission('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update User Privileges</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          select
          margin="dense"
          label="Level"
          fullWidth
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
        >
          <MenuItem value="U">User</MenuItem>
          <MenuItem value="W">Worker</MenuItem>
          <MenuItem value="M">Manager</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePrivilegesDialog;
