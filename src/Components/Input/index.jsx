import { TextField } from '@material-ui/core'

const Index = ({input, ...props}) => {
  return (
    <TextField
      fullWidth
      autoFocus
      inputProps={input}
      {...props}
    />
  )
};

export default Index;