import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = ({ register, toogleAuthentication, setAlert }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const editForm = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [field]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    if (form.password !== form.confirmPassword) {
      setAlert('Las contraseñas no coinciden', 'error');
      return;
    }
    const success = await register(newUser);
    if (success) {
      toogleAuthentication();
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        width: '100%',
        '& .MuiTextField-root': { width: '300px' },
      }}>
      <Typography>REGÍSTRATE CON</Typography>
      <form
        onSubmit={(e) => {
          submit(e);
        }}>
        <Box>
          <TextField
            id='name'
            label='Nombre'
            variant='standard'
            margin='normal'
            type='text'
            name='name'
            value={form.name}
            onChange={(e) => {
              editForm(e);
            }}
          />
        </Box>
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
        <Box>
          <TextField
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            label='Confirmar contraseña'
            variant='standard'
            margin='normal'
            value={form.confirmPassword}
            onChange={(e) => {
              editForm(e);
            }}
          />
        </Box>
        <Button sx={{ marginTop: '30px' }} variant='contained' type='submit'>
          Registrar
        </Button>
        <Typography sx={{ marginTop: '30px' }}>
          ¿Ya tienes una cuenta?
        </Typography>
        <Button
          onClick={() => {
            toogleAuthentication();
          }}>
          Inicia sesión
        </Button>
      </form>
    </Box>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
})(Register);
