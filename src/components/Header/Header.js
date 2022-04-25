import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import InputBase from '@mui/material/InputBase';

const Header = ({ companyName }) => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignContent: 'center',
          justifyItems: 'center',
          border: '2px solid black',
        }}
      >
        <Box>
          <h1>{companyName}</h1>
        </Box>
        <Search>
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Box>
          <h1>Links</h1>
        </Box>
      </Box>
    </>
  );
};

export default Header;
