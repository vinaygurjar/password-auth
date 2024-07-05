import React, { useState } from 'react';
import { Container, TextField, Typography, IconButton, InputAdornment, Button, Grid, Paper, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import image from './images/rws.png';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import backgroundImage from './images/backgroundimage.png';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    validatePassword(password, event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password, confirmPassword) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLength = password.length >= 8;

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasLength) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number');
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    if (password === confirmPassword && !passwordError) {
      console.log('Passwords match, form submitted successfully.');
    } else {
      console.log('Passwords do not match or validation conditions are not met.');
    }
  };

  const handleCancel = () => {
    // Clear input fields
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Container>
        <Paper style={{ padding: '100px' }}>
          <Grid container spacing={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div className='container_1'>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom style={{display: 'flex', alignItems: 'center'}}>
                  <img src={image} alt="logo" style={{ height: '40px', width: '40px' }} />
                  RWS
                </Typography>
                <Typography variant="h5" style={{ fontWeight: '600', marginTop: '10px' }}>
                  Profile Setup
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'black', marginTop: '5px', height: '50px' }}>
                  Please create your password
                </Typography>
              </Grid>
              <div style={{
                display:'flex',
                flexDirection:'column',
                gap:20
              }}>
                <Grid item xs={12}>
                  <TextField
                    sx={{width:'41ch'}}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    error={passwordError !== ''}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{width:'41ch'}}
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    fullWidth
                    error={passwordError !== ''}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </div>            
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px'}}>
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} disabled={password !== confirmPassword || passwordError !== ''}>
                  Submit
                </Button>
              </Grid>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className='container_2'>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ fontSize: '20px', marginTop: '20px', height: '40px' }}>
                  Your Password should have at least
                </Typography>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', height: '35px', gap: 8, color: password.length === 0 || password.length >= 8 ? "black" : "red" }}>
                {password.length === 0 ? <CheckIcon style={{ color: "black" }} /> : password.length >= 8 ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                8 Characters
                </Typography>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', height: '35px', gap: 8, color: password.length === 0 || /[a-z]/.test(password) ? "black" : "red" }}>
                {password.length === 0 ? <CheckIcon style={{ color: "black" }} /> : /[a-z]/.test(password) ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                One LowerCase Letter
                </Typography>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', height: '35px', gap: 8, color: password.length === 0 || /\d/.test(password) ? "black" : "red" }}>
                {password.length === 0 ? <CheckIcon style={{ color: "black" }} /> : /\d/.test(password) ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                One Number or Symbol
                </Typography>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', height: '35px', gap: 8, color: password.length === 0 || /[A-Z]/.test(password) ? "black" : "red" }}>
                {password.length === 0 ? <CheckIcon style={{ color: "black" }} /> : /[A-Z]/.test(password) ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
                One UpperCase Letter
                </Typography>
              </Grid>
            </div>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default App;