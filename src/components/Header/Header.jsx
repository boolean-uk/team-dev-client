import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
          <Box>Search Bar</Box>
          {/* -- */}
          <Box>
            <Button>Search User</Button>
          </Box>
        </Box>
        <Box>
          <Button>Add Cohort</Button>
          <Button>Logout</Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;
