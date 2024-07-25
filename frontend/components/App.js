import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  // ❗ Create state to hold the data from the API
  // ❗ Create effects to fetch the data and put it in state
  const [characters, setCharacters] = useState([])
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleResponse, planetsResponse] = await Promise.all([
          axios.get(urlPeople),
          axios.get(urlPlanets)
        ])
        
        const peopleData = peopleResponse.data
        const planetsData = planetsResponse.data

        
        const planetMap = planetsData.reduce((map, planet) => {
          map[planet.id] = planet.name
          return map
        }, {})

    
        const updatedCharacters = peopleData.map(character => ({
          ...character,
          homeworld: planetMap[character.homeworld] || 'Unknown'
        }))

        setCharacters(updatedCharacters)
        setPlanets(planetsData)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])
  
  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
