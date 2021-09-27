import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DeleteIcon from "@material-ui/icons/Delete";

const Index = ({ items, onRemove }) => {
  console.log(items);
  return (
    <Grid container spacing={2}>
      <Typography style={{ margin: "5px 10px" }} variant="h6" component="div">
        Skill Tree
      </Typography>
      <Grid
        item
        xs={12}
        md={6}
        style={{ marginBottom: 20, maxHeight: "40vh", overflowY: "scroll" }}
      >
        <List>
          {(!items || items.length === 0) && (
            <Typography variant="caption" component="p">
              Empty list, try add some!
            </Typography>
          )}
          {items &&
            items.length > 0 &&
            items.map((item, index) => {
              return (
                <ListItem
                  key={index}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <MenuBookIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.status} />
                  <ListItemSecondaryAction onClick={() => onRemove(item.id) }>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </Grid>
    </Grid>
  );
};

export default Index;
