import React, { useState } from 'react';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Register from './Register';
import Login from './Login';
import { Navigate } from 'react-router-dom';

const Authentication = ({ isAuthenticated }) => {
  const [isRegister, setIsRegister] = useState(false);

  const changeIsRegister = () => {
    setIsRegister(!isRegister);
  };

  if (isAuthenticated) {
    return <Navigate to='/lists' />;
  }

  return (
    <Container maxWidth='md' sx={{ marginBottom: '30px', marginTop: '40px' }}>
      {isRegister ? (
        <Register toogleAuthentication={changeIsRegister} />
      ) : (
        <Login toogleAuthentication={changeIsRegister} />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Authentication);
