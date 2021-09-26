import { Avatar, Box, Typography } from "@material-ui/core";
import kenzie from './kenzie.svg'
import { blueGrey } from '@material-ui/core/colors';

const Logo = () => {
  return (
    <Box sx={{
      marginTop: 8,
      marginBottom: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: blueGrey['A200']
    }}>
      <Avatar src={kenzie} alt={"KenzieHub"} style={{ width: 64, height: 64 }} />
      <Typography variant="h3">Kenzie Hub</Typography>
    </Box>
  )
}

export default Logo;