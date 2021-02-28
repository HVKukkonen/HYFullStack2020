import React, { useState, useEffect } from 'react'
import axios from 'axios'
import impList from '../services/persons'  // list of axios operations
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

        if (props.exclude.indexOf(props.person.name) < 0) {
            return (
                <p>{props.person.name} {props.person.number} {props.button}</p>
            )
        } else {
            return (null)
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

function ButtonFunctionality(name, id, msgHandler, excluder) {
    if (window.confirm('Are you sure you want to remove ' + name)) {
        msgHandler('Contact removed successfully')
        excluder(name)
        setTimeout(() => msgHandler(null), 2000)
        console.log("ButtonFunction id " + id)
        return (
            impList.remove(id)
        )
    }
}

const DelButton = (props) => {
    // move to on click not to be run always
    return (
        <button onClick={() =>
            ButtonFunctionality(props.name, props.id, props.msgHandler, props.exclusionHandler)
        }> remove </button>
    )
}

// custom success alert
const SuccAlert = (msg) => {
    if (msg !== null) {
        return (
            <div className='succAlertMsg'>
                {msg}
            </div>
        )
    } else {
        return (null)
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

    // client side handler for contact removal
    const [excludedContact, setExclusion] = useState([])

    const exclHandler = (toExclude) => {
        setExclusion(excludedContact.concat(toExclude))
    }

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
            setNewName(newName)
            setNewNumber(newNumber)
            console.log('post')
            impList.create(listElem)
                .then(
                    newContact => {
                        setPersons(persons.concat(newContact.data))
                        setOperationMsg('Addition successful!')
                        setTimeout(() => setOperationMsg(null), 2000)
                    }
                )
        } else {
            if (window.confirm(newName + ' is not unique. Do you want to update with the number given?')) {
                impList
                    .update(persons.find(person => person.name === newName).id, listElem)
                    // update persons on screen
                    .then(updatedPerson => {
                        setPersons(
                            persons.map(person => {
                                if (person.name === newName) {
                                    return updatedPerson.data
                                } else {
                                    return person
                                }
                            })
                        )
                    })
            }
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
            {console.log("persons ", persons)}
            {persons.map(person =>
                <Info
                    key={person.name}
                    person={person}
                    filter={nameFilter}
                    button={<DelButton
                        name={person.name}
                        id={person.id}
                        msgHandler={setOperationMsg}
                        exclusionHandler={exclHandler}
                    />}
                    exclude={excludedContact}
                />
            )}

        </div>
    )

}

export default App