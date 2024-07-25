import React, { useState } from 'react'

function Character({ character }) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const [showPlanet, setShowPlanet] = useState(false);

  
  const CardClick = () => {
    setShowPlanet(prevState => !prevState);
  };

  return (
    <div className="character-card" onClick={CardClick}>
      {/* Use the same markup with the same attributes as in the mock */}
      <h3 className="character-name">{character.name}</h3>
      {showPlanet && (
        <p>
        Planet: <span class="character-planet">{character.homeworld}</span>
        </p>
      )}
    </div>
  )
}

export default Character
