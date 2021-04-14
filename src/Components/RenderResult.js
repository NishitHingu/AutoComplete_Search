import { Grid } from "@material-ui/core";
import React from "react";
import RenderResultItem from "./RenderResultItem";


const RenderResult = (props) => {
    const result = props.result;
  return (
    <Grid container justify="center" style={{marginTop: "4rem", width: "100vw"}} >
      {result.map((item) => (
          <Grid item xs={10} sm={8} style={{marginBottom: "1rem"}} key={item["Employee ID"]}>
            <RenderResultItem item={item} />
          </Grid>
          ))}
    </Grid>
  );
};

export default RenderResult;
