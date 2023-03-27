import React, { useState } from 'react';
import './App.css';
import AdaptiveCardRenderer from './components/AdaptiveCardRenderer';
import generateAdaptiveUI from './helpers/GenerateAdaptiveUI';

const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY || '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';

function App() {
  const [appDescription, setAppDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uiDescription, setUIDescription] = useState(null);

  const handleCardAction = async (action) => {
    console.log(action);
    setIsLoading(true);

    // Call GenerateAdaptiveUI again with the action data
    const response = await generateAdaptiveUI(openai_api_key, appDescription, action, uiDescription);

    setUIDescription(response);

    setIsLoading(false);
  };

  const handleGenerateAppSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Call GenerateAdaptiveUI to get the uiDescription
    const response = await generateAdaptiveUI(openai_api_key, appDescription);

    setUIDescription(response);

    setIsLoading(false);
  };

  const handleAppDescriptionChange = (event) => {
    setAppDescription(event.target.value);
  };

  const { nextUI, currentStateUI, globalActions, memory } = uiDescription || {};

  return (
    <div className="App">
      <header className="App-header">
        <h1>GPT - Generative UI Demo</h1>
        <p>Powered by <a href='https://adaptivecards.io'>Adaptive Cards</a></p>
      </header>
      <div className="App-Generator">
        <form onSubmit={handleGenerateAppSubmit}>
          <label>
            Enter app description:
            <input className='appDescriptionInput' type="text" value={appDescription} onChange={handleAppDescriptionChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
  
      {uiDescription && appDescription && <h1>{appDescription} app - GPT ✨</h1>}

      {isLoading && <div className='generatingLabel'>✨ Generating, please wait...</div>}

      {nextUI && (
        <div>
          <h2>Next step: </h2>
          <AdaptiveCardRenderer cardData={nextUI} onExecuteAction={handleCardAction} />
        </div>
      )}

      {currentStateUI && (
        <div>
          <h2>Current state: </h2>
          <AdaptiveCardRenderer cardData={currentStateUI} />
        </div>
      )}

      {globalActions && (
        <div>
          <h2>Global actions: </h2>
          <AdaptiveCardRenderer cardData={globalActions} onExecuteAction={handleCardAction} />
        </div>
      )}

      {memory && 
        <div>
          <h2>Memory: </h2>
          <pre>{JSON.stringify(memory, null, 2)}</pre>
        </div>
      }
      </div>
  );
}

export default App;
