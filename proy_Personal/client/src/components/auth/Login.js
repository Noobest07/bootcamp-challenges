import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../../actions/auth';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = ({ login, toogleAuthentication }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const editForm = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [field]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        width: '100%',
        '& .MuiTextField-root': { width: '300px' },
      }}>
      <Typography>INGRESA CON</Typography>
      <form
        onSubmit={(e) => {
          submit(e);
        }}>
        <Box>
          <TextField
            id='email'
            type='email'
            name='email'
            label='Correo'
            variant='standard'
            margin='normal'
            value={form.email}
            onChange={(e) => {
              editForm(e);
            }}
          />
        </Box>
        <Box>
          <TextField
            id='password'
            type='password'
            name='password'
            label='Contraseña'
            variant='standard'
            margin='normal'
            value={form.password}
            onChange={(e) => {
              editForm(e);
            }}
          />
        </Box>
        <Button sx={{ marginTop: '30px' }} variant='contained' type='submit'>
          Iniciar Sesión
        </Button>
        <Typography sx={{ marginTop: '30px' }}>
          ¿No tienes una cuenta?
        </Typography>
        <Button
          onClick={() => {
            toogleAuthentication();
          }}>
          Regístrate
        </Button>
      </form>
    </Box>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
