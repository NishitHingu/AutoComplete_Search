import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    padding: "0 0.5rem",
  },
  desig: {
    fontWeight: "400",
    fontSize: "16px",
  },
}));

const RenderResultItem = (props) => {
  const item = props.item;

  //   const item = props.item;
  const classes = useStyle();
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={item["Employee Name"]}
        subheader={item["Designation"]}
      />
      <CardContent style={{ padding: "0 1rem 1rem 1rem" }}>
        <Grid container justify="space-between">
          <Grid item xs={4}>
            <Typography variant="body1">Salary: ${parseInt(item["Salary"]).toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="flex-start" alignItems="center">
              <Grid item>
                <LocationOnIcon />
              </Grid>
              <Grid item>
                <Typography variant="body1" component="span">
                  {item["State"]}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RenderResultItem;
