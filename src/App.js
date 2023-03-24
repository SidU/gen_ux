import React, { useState } from 'react';
import './App.css';
import AdaptiveCardRenderer from './components/AdaptiveCardRenderer';

function App() {
  const [cardDescription, setCardDescription] = useState('');
  const [showAdaptiveCard, setShowAdaptiveCard] = useState(false);

  const handleAction = (action) => {
    console.log(action);
    alert('You clicked ' + action.title + ' with data ' + JSON.stringify(action.data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAdaptiveCard(true);
  };

  const handleCardDescriptionChange = (event) => {
    setCardDescription(event.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Card Description:
          <input type="text" value={cardDescription} onChange={handleCardDescriptionChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {showAdaptiveCard && (
        <AdaptiveCardRenderer cardDescription={cardDescription} onExecuteAction={handleAction} />
      )}
    </div>
  );
}

export default App;
