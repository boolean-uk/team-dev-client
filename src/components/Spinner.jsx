import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner({ style }) {
  return (
    <Box sx={{ display: 'flex', ...style }}>
      <CircularProgress />
    </Box>
  );
}
