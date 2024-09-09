import React, { useState, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
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
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import Iconify from 'src/components/iconify';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import { useAuth } from 'src/api/Auth/AuthContext';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const userData = JSON.parse(storedAuthState);
      if (userData.isAuthenticated) {
        redirectToDashboard(userData.user.role);
      }
    }
  }, []);

  const redirectToDashboard = (role) => {
    switch (role) {
      case 'ADMIN':
        router.push('/Admin');
        break;
      case 'DOCTOR':
        router.push('/MedecinAppointments');
        break;
      case 'PATIENT':
        router.push('/BookAdoctor');
        break;
      default:
        router.push('/dashboard');
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const userData = await login(email, password);
    setLoading(false);
    if (userData) {
      localStorage.setItem('authState', JSON.stringify({ isAuthenticated: true, user: userData }));
      redirectToDashboard(userData.role);
    } else {
      alert('Invalid email or password');
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
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
        Login
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
          <Typography variant="h4">Sign in to HealthBooker</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link component={RouterLink} to="/register" variant="register" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          
          
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
