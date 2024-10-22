import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('');
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/registeredUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          setError('Failed to fetch registered users');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching registered users');
      }
    };

    fetchRegisteredUsers();
  }, []);

  const handleSaveUser = () => {
    if (editingUserId !== null) {
      const updatedUser: User = { id: editingUserId, firstName, lastName, email, mobile, country };
      const updatedUsers = users.map(user => user.id === editingUserId ? updatedUser : user);
      setUsers(updatedUsers);
    } else {
      const newUserId = Math.max(...users.map(user => user.id), 0) + 1;
      const newUser: User = { id: newUserId, firstName, lastName, email, mobile, country };
      setUsers([...users, newUser]);
    }
    setEditingUserId(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
    setCountry('');
  };





  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }


      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      setError('An error occurred while deleting the user');
    }
  };


  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container
        maxWidth="md"
        sx={{
          position: 'fixed',
          top: 100,
          right: 10,
          left: '18%',
          width: '100%',
          pt: 6,
          pb: 6,
          zIndex: 1,
          boxShadow: 3,
          borderRadius: 4,
          flex: 'full',
          paddingTop: '20px',
          maxHeight: 590
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#000000' }}>Users</Typography>
        </Box>
        <Paper sx={{ maxHeight: 250, backgroundColor: '#F5F5F5', overflow: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 150, px: 1, fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1, fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 150, px: 1, fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1, fontWeight: 'bold' }}>Mobile</TableCell>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1, fontWeight: 'bold' }}>Country</TableCell>
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 80, px: 1, fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell sx={{ width: 150, px: 1, height: 50 }}>{user.firstName}</TableCell>
                  <TableCell sx={{ width: 100, px: 1, height: 50 }}>{user.lastName}</TableCell>
                  <TableCell sx={{ width: 150, px: 1, height: 50 }}>{user.email}</TableCell>
                  <TableCell sx={{ width: 100, px: 1, height: 50 }}>{user.mobile}</TableCell>
                  <TableCell sx={{ width: 100, px: 1, height: 50 }}>{user.country}</TableCell>
                  <TableCell sx={{ width: 80, px: 1, height: 50 }}>
                  <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setUserToDelete(user.id);
                        setDialogOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this user?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (userToDelete !== null) {
                  handleDeleteUser(userToDelete);
                  setDialogOpen(false);
                  setUserToDelete(null); 
                }
              }}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Users;