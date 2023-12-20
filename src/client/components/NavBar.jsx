import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (check for an auth token)
    setIsLoggedIn(!!localStorage.getItem('authToken'));
    // If localStorage.getItem('authToken') returns a token (a truthy value), !! converts it to true.
    // If it returns null (in case the token is not present, which is a falsy value), !! converts it to false.
  }, []);

  const handleLogout = async () => {
    // Make a request to the backend to logout
    // On successful logout remove the auth token and update state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AppBar
      position='static'
      sx={{ width: '100%', margin: 0, backgroundColor: '#2d00f7' }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          component={Link}
          to='/'
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          SubZero
        </Typography>
        <Button color='inherit' component={Link} to='/dashboard'>
          Dashboard
        </Button>
        {isLoggedIn ? (
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

/*
// Logout Endpoint if we're using session tokens
app.post('/user/logout', (req, res) => {
  // Assuming we're using some 'tokenName' that's sent in an HTTP-only cookie
  res.clearCookie('tokenName'); 

  // More backend logic to invalidate the token if stored in a database/session store

  res.status(200).send({ message: 'Logged out successfully' });
});
*/
