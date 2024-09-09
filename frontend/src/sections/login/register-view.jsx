import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { useAuth } from 'src/api/Auth/AuthContext';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();
  const [usernamex, setUsernamex] = useState('');
  const [emailx, setEmailx] = useState('');
  const [passwordx, setPasswordx] = useState('');
  const [rolex, setRolex] = useState('PATIENT');
  const [medicalHistoryx, setMedicalHistoryx] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/patients', 
        {
        username: usernamex,
        password: passwordx,
        email: emailx,
        role: rolex,
        medicalHistory: medicalHistoryx,
      });
      const userData = response.data;
      setLoading(false);
      if (userData) {
        router.push('/login');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          value={usernamex}
          onChange={(e) => setUsernamex(e.target.value)}
        />
        <TextField
          name="email"
          label="Email address"
          value={emailx}
          onChange={(e) => setEmailx(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={passwordx}
          onChange={(e) => setPasswordx(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="medicalHistory"
          label="Medical History"
          value={medicalHistoryx}
          onChange={(e) => setMedicalHistoryx(e.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
        onClick={handleClick}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign up to HealthBooker</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link component={RouterLink} to="/login" variant="body2" sx={{ ml: 0.5 }}>
              Sign in Here
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
