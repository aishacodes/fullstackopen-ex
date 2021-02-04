import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import phoneService from "./services/phoneServices";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [errmessage, setErrmessage] = useState("");

  useEffect(() => {
    phoneService.getAll().then((res) => setPersons(res.data));
  }, []);

  const AddName = (event) => {
    event.preventDefault();
    if (!newName.trim()) return null;
    const userExist = persons.find(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );
    if (userExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. replace the old number with a new one?`
        )
      ) {
        const id = userExist.id || userExist._id;
        phoneService
          .updatePerson(id, {
            name: userExist.name,
            number: newNumber.trim(),
          })
          .then((res) => {
            console.log(res);
            setPersons((persons) =>
              persons.map((person) => {
                if (person.id || person._id === res.data._id || res.data.id)
                  person.number = res.data.number;
                return person;
              })
            );
            setNewName("");
            setNewNumber("");
            return;
          })
          .catch((er) => console.log(er));
        return;
      }
    }
    const newObj = { name: newName.trim(), number: newNumber.trim() };
    phoneService
      .create(newObj)
      .then((res) => {
        setPersons([...persons, res.data]);
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        setErrmessage(error.response.data.error);
        setTimeout(() => {
          setErrmessage(null);
        }, 5000);
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

  const handleDelete = (id) => {
    phoneService
      .removePerson(id)
      .then((res, req) => {
        setPersons((persons) =>
          persons.filter((person) => person.id || person._id !== id)
        );
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status &&
          err.response.status === 404
        ) {
          setErrmessage(
            `${
              persons.find((person) => person.id === id).name
            } has already been removed from server`
          );
          setTimeout(() => {
            setErrmessage(null);
          }, 5000);
        }
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p className="message">
        {message && <span className="sucess">{message}</span>}
        {errmessage && <span className="error">{errmessage}</span>}
      </p>
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
      <Persons persons={contactToShow} handleDeletee={handleDelete} />
    </div>
  );
};

export default App;
