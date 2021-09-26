import { Container, Box } from "@material-ui/core";

import Logo from '../Logo'; 

const Index = ({ children }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Logo style={{marginBottom: 10}}/>
      <Box
        maxWidth="xs"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        { children }
      </Box>
    </Container>
  )
};

export default Index;