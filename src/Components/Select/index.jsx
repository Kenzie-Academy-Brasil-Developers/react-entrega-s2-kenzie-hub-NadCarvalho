import { MenuItem, TextField } from '@material-ui/core';

const Index = ({ select, menuProps, items, ...props }) => {
  const { removeNone } = props;
  return (
    <TextField
      select
      fullWidth
      inputProps={select}
      inputRef={select.ref}
      innerRef={select.ref}
      {...props}
    >
      {!removeNone && (
        <MenuItem value="" {...menuProps}>
          None
        </MenuItem>
      )}
      {items &&
        items.map((item, index) => {
          let key = index;
          let label = item;
          let value = item;
          if (item.label && item.value) {
            label = item.label;
            value = item.value;
          }
          return (
            <MenuItem key={key} value={value} {...menuProps}>
              {label}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default Index;
