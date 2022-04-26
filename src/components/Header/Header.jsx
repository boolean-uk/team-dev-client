import { Box, flexbox } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import InputBase from '@mui/material/InputBase';

{
  /* <Typography variant="h1" component="h2">
  h1. Heading
</Typography>; */
}

const Header = ({ companyName }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          // justifyItems: 'center',
          // alignItems: 'center',
          border: '2px solid black',
          width: '100vw',
          padding: '1em'
        }}
      >
        {/* -- */}
        <Box>
          <Typography>
            <p>{companyName}</p>
          </Typography>
        </Box>
        {/* -- */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Box>
          
          <InputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
  
          </Box>
          {/* -- */}
          <Box>
            <Button variant="contained">Search User</Button>
          </Box>
        </Box>
        <Box>
          <Stack spacing={2} direction="row">
          <Button variant="contained">Add Cohort</Button>
          <Button variant="contained">Logout</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
