import { Box, Typography } from '@material-ui/core';

import Container from '../../Components/Container'
import Card from '../../Components/Card'
import Input from '../../Components/Input'
import Button from '../../Components/Button'

import { useHistory } from "react-router-dom";
 
const Welcome = () => {
  let history = useHistory();

  const goToRegister = () => {
    history.push("/register");
  }
  
  return (
    <Container>
      <Card>
        <Typography variant="subtitle1">Welcome</Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Input label="Username"/>
          <Input label="Password" type="password"/>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <Button>Login</Button>
            <Button color='secondary' onClick={() => goToRegister() }>Register</Button>
          </Box>

        </Box>
      </Card>
    </Container>
  );
}

export default Welcome;