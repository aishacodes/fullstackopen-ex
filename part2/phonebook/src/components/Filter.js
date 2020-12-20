import React from "react";

function Filter({ filter, handleFilterCh }) {
  return (
    <div>
      Filter shown with: <input value={filter} onChange={handleFilterCh} />
    </div>
  );
}

export default Filter;
