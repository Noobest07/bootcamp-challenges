import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as AlertCompoment } from '@mui/material';
import Stack from '@mui/material/Stack';

const Alert = ({ alerts }) => {
  return (
    <Stack
      sx={{ width: '100%', position: 'fixed', top: '40px', zIndex: 1000 }}
      spacing={2}>
      {alerts.map((alert) => (
        <AlertCompoment severity={alert.alertType} key={alert.id}>
          {alert.msg}
        </AlertCompoment>
      ))}
    </Stack>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
