import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { SearchComponent } from './SearchComponent';

const Header = ({ companyName }) => {


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'grey',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100vw',
          padding: '1em'
        }}
      >

        <Box>
          <Typography>
            <p>{companyName}</p>
          </Typography>
        </Box>

        {SearchComponent()}

        <Box>
          <Stack spacing={2} direction='row'>
          <Button variant='contained'>Add Cohort</Button>
          <Button variant='contained'>Logout</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;

