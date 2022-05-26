import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        textAlign: 'center',
        width: '100%',
        zIndex: 100,
        background: 'white',
      }}>
      <Typography>© David Valverde 2022</Typography>
    </Box>
  );
}
