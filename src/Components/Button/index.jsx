import { Button } from '@material-ui/core'

const Index = ({variant, color, ...props}) => {
  return (
    <Button
      style={{ marginTop: 24, margin: 12, minWidth: 64 }}
      variant={variant || 'contained'}
      color={color || 'primary'}
      {...props}
    />
  )
};

export default Index;