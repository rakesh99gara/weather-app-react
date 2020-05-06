import React from "react";

function Report({ day, max, min }) {
  return (
    <div className="report">
      <p>{day}</p>
      <p className="max">{max}</p>
      <p className="min">{min}</p>
    </div>
  );
}

export default Report;

// hello all how are you all in there
