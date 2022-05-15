import React from "react";

function TextArea(props) {
  return (
    <textarea
      className="txtarea"
      rows={3}
      defaultValue={props.placeholder}
    ></textarea>
  );
}

export default TextArea;
