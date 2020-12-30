import React from "react";

function Persons({ persons, handleDeletee }) {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) handleDeletee(person.id);
  };
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={(e) => handleDelete(person)}>delete</button>
        </p>
      ))}{" "}
    </div>
  );
}
export default Persons;
