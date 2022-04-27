import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

export function SearchComponent() {

    

  return <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
    <Box sx={{ backgroundColor: 'white' }}>
      <InputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
    </Box>
    <Box>
      <Button variant='contained'>Search User</Button>
    </Box>
  </Box>;
}
