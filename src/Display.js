import React from "react";

const Display = ({ result, figure }) => {
  return (
    <div className="display-screen">
      {result ? <p>{result}</p> : 0}
      <p>{figure || 0}</p>
    </div>
  );
};

export default Display;
