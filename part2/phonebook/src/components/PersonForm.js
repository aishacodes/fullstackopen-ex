import React from "react";

function PersonForm({
  addName,
  handleNewNumber,
  newNumber,
  newName,
  handleNewName,
}) {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>{" "}
      <br />
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
