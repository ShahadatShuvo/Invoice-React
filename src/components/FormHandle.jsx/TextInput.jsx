import { Box } from "@mui/material";
import React from "react";

function TextInput(props) {
  return (
    <Box>
      <input
        className="txtbox"
        type="text" 
        name=""
        id=""
        placeholder={props.placeholder}
      />
    </Box>
  );
}

export default TextInput;
