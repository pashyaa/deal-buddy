import React, { useState, useEffect } from 'react';
import { Grid, Typography, Table, TableRow, TableCell, TableBody, Container, Box, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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

  useEffect(() => {
    const fetchLoggedUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await fetch(`${process.env.REACT_APP_API_URL}/loggedUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          setError('Failed to fetch logged users');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching logged users');
      }
    };

    fetchLoggedUsers();
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

  // Function to edit a user
  const handleEditUser = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setEditingUserId(id);
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setEmail(userToEdit.email);
      setMobile(userToEdit.mobile);
      setCountry(userToEdit.country);
    }
  };


  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container
        maxWidth="md"
        sx={{
          position: 'fixed', top: 100, right: 10, left: '18%', width: '100%', pt: 6, pb: 6, zIndex: 1,
          boxShadow: 3, borderRadius: 4, flex: 'full', maxHeight: 560
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={2}>
              <Typography variant="h4" sx={{ flex: 1, textAlign: 'center', color: '#000000' }}>Users</Typography>
              <Grid item xs={12}>
                <Typography variant="h5">User List</Typography>
                <Paper sx={{ maxHeight: 250, backgroundColor: '#F5F5F5', overflow: 'auto' }}>
                  <Table>
                    <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 150, px: 1 }}>First Name</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1 }}>Last Name</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 150, px: 1 }}>Email</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1 }}>Mobile</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1 }}>Country</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 80, px: 1 }}>Actions</TableCell>
                    </TableRow>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell sx={{ width: 150, px: 1 }}>{user.firstName}</TableCell>
                          <TableCell sx={{ width: 100, px: 1 }}>{user.lastName}</TableCell>
                          <TableCell sx={{ width: 150, px: 1 }}>{user.email}</TableCell>
                          <TableCell sx={{ width: 100, px: 1 }}>{user.mobile}</TableCell>
                          <TableCell sx={{ width: 100, px: 1 }}>{user.country}</TableCell>
                          <TableCell sx={{ width: 80, px: 1 }}>
                            <IconButton aria-label="edit" onClick={() => handleEditUser(user.id)}>
                              <EditIcon />
                            </IconButton>
                            &nbsp;&nbsp;
                            <IconButton aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Users;
