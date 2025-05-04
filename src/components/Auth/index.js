import { useState } from 'react';
import { signup, login } from '../api';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';

function Auth() {
  const theme = useTheme();
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSignup && password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }
  
    try {
      const response = isSignup
        ? await signup(username, password)
        : await login(username, password);
  
      setMessage(response);
  
      // ✅ Redirect to homepage if login is successful
      if (!isSignup && response === 'Login successful') {
        navigate('/');
      }
    } catch (error) {
      setMessage('Something went wrong!');
    }
  };
  

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#e3f2fd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" sx={{ color: theme.palette.primary.main, mb: 2 }}>
            {isSignup ? 'Sign Up' : 'Log In'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignup && (
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isSignup ? 'Sign Up' : 'Log In'}
            </Button>
            <Button
              onClick={() => setIsSignup(!isSignup)}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              {isSignup ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
            </Button>
          </Box>

          {message && (
            <Typography
              align="center"
              mt={2}
              sx={{
                color: message.toLowerCase().includes('success')
                  ? 'success.main'
                  : 'error.main',
              }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Auth;
