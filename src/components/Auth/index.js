import { useState } from 'react';
import { signup, login } from '../api';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import './styles.css'; // Import your CSS

function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

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

      if (!isSignup && response === 'Login successful') {
        localStorage.setItem("isLoggedIn", "true");
        navigate('/');
      }
    } catch (error) {
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="auth-toggle">
      <Paper elevation={6} className="auth-card">
        <Typography variant="h5" component="h2">
          {isSignup ? 'Sign Up' : 'Log In'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          {isSignup && (
            <div>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="auth-button"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>

          <Button
            onClick={() => setIsSignup(!isSignup)}
            fullWidth
            className="auth-toggle-button"
          >
            {isSignup ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
          </Button>
        </form>

        {message && (
          <div className={`message ${message.toLowerCase().includes('success') ? '' : 'error'}`}>
            {message}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Auth;
