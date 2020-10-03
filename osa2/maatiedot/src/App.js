import React, { useState, useEffect } from 'react'
import axios from 'axios'

// returns filtered list by applying given filter term
// const FilterList = (props) => {

//   console.log('fterm', props.filterTerm)
//   console.log('inputlist', props.list)

//   // return elem if its name passes filter
//   const filtMapper = (elem) => {
//     if (elem.name.toLowerCase().includes(props.filterTerm.toLowerCase())) {
//       return (elem)
//     }
//   }

//   var filtList = []
//   // map over list, append elements passing filter
//   for (var elem of props.list){
//     console.log('in-loop', elem)
//     console.log('out-loop', filtMapper(elem))
//     filtList = filtList.concat(filtMapper(elem))
//     console.log('list-in-loop', filtList)
//   }

//   return (filtList)
// }

const Filter = (props) => {
  return (
    <div>
      Filter by name:
      <input
        value={props.nameFilter}
        onChange={props.filterHandler}
      />
    </div>
  )
}

const Display = (props) => {
  return(<p>{props.name}</p>)
}

// APP
const App = () => {

  // DATA LOAD
  // state hook
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  // --------------------------filter handler------------------------
  const [nameFilter, setFilter] = useState('')

  const filterHandler = (event) => {
    setFilter(event.target.value)
  }

  const filteredList = countries.filter(elem => elem.name.toLowerCase().includes(nameFilter.toLowerCase()))


  return (
    <div>

      <Filter nameFilter={nameFilter} filterHandler={filterHandler} />

      <h2>Countries</h2>
      
      {filteredList.map(country => 
      <Display key={country.name} name={country.name} />
      )}

    </div>
  )

}

export default App;
