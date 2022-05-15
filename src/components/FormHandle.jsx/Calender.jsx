import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Calender() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      className="txtbox"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MMMM d, yyyy"
    />
  );
}

export default Calender;
