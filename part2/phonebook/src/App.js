import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const AddName = (event) => {
    event.preventDefault();
    if (!newName.trim()) return null;
    if (
      persons.find(
        (person) =>
          person.name.toLowerCase().trim() === newName.toLowerCase().trim()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    setPersons([
      ...persons,
      { name: newName.trim(), number: newNumber.trim() },
    ]);
    setNewName("");
    setNewNumber("");
  };

  // const handleFilter = (ev) => {
  //   console.log(ev);
  //   ev.preventDefault();
  //   const query = ev.target.value;
  //   if (!query.trim()) setFilter(() => null);
  //   setFilter(
  //     persons.filter((person) => {
  //       return (
  //         person.name.toLowerCase().trim().indexOf(query.trim().toLowerCase()) >
  //         -1
  //       );
  //     })
  //   );
  // };
  const handleFilter = persons.filter(
    (person) =>
      person.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) > -1
  );

  const contactToShow = handleFilter.length ? handleFilter : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with:{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <form onSubmit={AddName}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>{" "}
        <br />
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contactToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}{" "}
    </div>
  );
};

export default App;
