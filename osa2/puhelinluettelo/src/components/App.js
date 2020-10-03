import React, { useState, useEffect } from 'react'
import axios from 'axios'
import impList from '../services/persons'
import '../index.css'


// --------------------- helper function to check uniqueness ----------------
function isUniq(objList, name) {
    var uniq = true
    objList.forEach(element => {
        if (element.name === name) { uniq = false }
    });
    return (uniq)
}

// -------------------display element item------------------------
const Info = (props) => {
    if (props.person.name.toLowerCase().includes(props.filter.toLowerCase())) {

        if (! props.person.name.includes(props.exclude)) {
            return (
                <p>{props.person.name} {props.person.number} {props.button}</p>
            )
            } else {
                return(null)
            }

        } else {
            return (null)
        }
}

// ------------- form to submit contact details------------------------
const ContactForm = (props) => {
    return (
        // form with two inputs and a button
        <form onSubmit={props.addPerson}>

            <div>
                name: <input
                    value={props.newName}
                    onChange={props.charHandler}
                />
            </div>

            <div>
                number: <input
                    value={props.newNumber}
                    onChange={props.numHandler}
                />
            </div>

            <div>
                <button type="submit">
                    add
                </button>
            </div>

        </form>
    )
}

// ---------------------- filter the list of contacts -------------------------------
const Filter = (props) => {
    return (
        <div>
            filter contacts by name:
            <input
                value={props.nameFilter}
                onChange={props.filterHandler}
            />
        </div>
    )
}

function ButtonFunctionality(name, id) {
    if (window.confirm('Are you sure you want to remove ' + name)){
        return (
            impList.remove(id)
        )
    }
}

const DelButton = (props) => {
    // move to on click not to be run always
        return (
        <button onClick={() => ButtonFunctionality(props.name, props.id, props.filterfunction)}> remove </button>
        )
}

// custom success alert
const SuccAlert = (msg) => {
    if (msg !== null){
        return(
        <div className='succAlertMsg'>
            {msg}
        </div>
        )
    } else {
        return(null)
    }
}

// ****************** APP TO RENDER *************************
const App = () => {

    const [persons, setPersons] = useState([])

    // -------------------- event hook to load data from server to state ---------------------
    useEffect(() => {
        console.log('effect')
        impList.getAll()
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }, [])

    // -------------------name handler---------------------------------
    const [newName, setNewName] = useState('')  // reset state

    const charHandler = (event) => {
        console.log('char event', event.target.value)
        setNewName(event.target.value)
    }

    // --------------------------number handler-------------------------
    const [newNumber, setNewNumber] = useState('')

    const numHandler = (event) => {
        console.log('num event', event.target.value)
        setNewNumber(event.target.value)
    }

    // --------------------------filter handler------------------------
    const [nameFilter, setFilter] = useState('')

    const filterHandler = (event) => {
        console.log('filter event', event.target.value)
        setFilter(event.target.value)
    }

    // operation message handler
    const [operationMsg, setOperationMsg] = useState(null)


    // ----------------------new contact form submission handler------------------------ 
    const submitNewContact = (event) => {

        // prevent default form submission
        event.preventDefault()

        // convert to list element
        const listElem = {
            name: newName,
            number: newNumber
        }

        // if unique add to contacts details given
        if (isUniq(persons, newName)) {
            setPersons(persons.concat(listElem))
            setNewName(newName)
            setNewNumber(newNumber)
            console.log('post')
            impList.create(listElem)
            setOperationMsg('Addition successful!')
            setTimeout(() => setOperationMsg(null), 5000)
        } else {
            alert(newName + ' is not unique')
        }
    }

    return (
        <div>

            <h2>Phonebook</h2>
            <Filter
                nameFilter={nameFilter}
                filterHandler={filterHandler}
            />

            <h2>Add new contact</h2>
            <ContactForm
                addPerson={submitNewContact}
                newName={newName}
                charHandler={charHandler}
                newNumber={newNumber}
                numHandler={numHandler}
            />
            {SuccAlert(operationMsg)}

            <h2>Numbers</h2>
            {persons.map(person =>
                <Info
                    key={person.name}
                    person={person}
                    exclude="xt"
                    filter={nameFilter}
                    button={<DelButton name={person.name} id={person.id} />}
                />
            )}

        </div>
    )

}

export default App