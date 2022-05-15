import React from "react";

function TextheadlineInput(props) {
  return (
    <input
      className="txtbox"
      type="text"
      name=""
      id=""
      style={{
        fontSize: "16px",
        fontWeight: 600,
      }}
      defaultValue={props.placeholder}
    />
  );
}

export default TextheadlineInput;
