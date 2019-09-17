import React from "react"
import Moment from "react-moment";
const dateFormat = (cell, row) => {
  return <Moment format="L">{cell}</Moment>;
};

export default dateFormat;
