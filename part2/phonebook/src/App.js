import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

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
    const newObj = { name: newName.trim(), number: newNumber.trim() };
    axios.post("http://localhost:3001/persons", newObj).then((res) => {
      setPersons([...persons, res.data]);
      setNewName("");
      setNewNumber("");
    });
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
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleNewName = (e) => setNewName(e.target.value);
  const handleFilterCh = (e) => setFilter(e.target.value);
  const contactToShow = handleFilter.length ? handleFilter : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterCh={handleFilterCh} />
      <h3>Add a new</h3>
      <PersonForm
        addName={AddName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={contactToShow} />
    </div>
  );
};

export default App;
