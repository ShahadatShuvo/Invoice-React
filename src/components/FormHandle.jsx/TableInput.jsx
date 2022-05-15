import { Box } from "@mui/material";
import React from "react";

function TableInput(props) {
  return (
    <Box mx={1}>
      <input
        className="tablebox"
        type="text"
        name=""
        id=""
        defaultValue={props.value}
      />
    </Box>
  );
}

export default TableInput;
