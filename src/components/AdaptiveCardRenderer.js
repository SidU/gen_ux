import React, { useEffect, useRef, useState } from 'react';
import { AdaptiveCard, HostConfig } from 'adaptivecards';
import generateAdaptiveCard from '../helpers/AdaptiveCardGenerator';

function AdaptiveCardRenderer(props) {
  const { cardDescription, cardData, onExecuteAction } = props;
  const cardRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [localCardData, setLocalCardData] = useState(null);

  useEffect(() => {
    if (!cardData && cardDescription) {
      const getCardData = async () => {
        setIsLoading(true);
        const data = await generateAdaptiveCard(cardDescription);
        setLocalCardData(data);
        setIsLoading(false);
      };

      getCardData();
    }
  }, [cardData, cardDescription]);

  useEffect(() => {
    if (cardData || localCardData) {
      const adaptiveCard = new AdaptiveCard();
      const data = cardData || localCardData;

      adaptiveCard.onExecuteAction = function(action) {
        if (onExecuteAction) {
          onExecuteAction(action);
        }
      };

      adaptiveCard.parse(data);

      adaptiveCard.hostConfig = new HostConfig({
        fontFamily: 'Segoe UI, Helvetica Neue, sans-serif',
        spacing: {
          small: 10,
          default: 20,
          medium: 30,
          large: 40,
          extraLarge: 50,
          padding: 20
        }
      });

      const renderedCard = adaptiveCard.render();

      if (cardRef.current.hasChildNodes()) {
        cardRef.current.removeChild(cardRef.current.firstChild);
      }
      
      cardRef.current.appendChild(renderedCard);
    }
  }, [cardData, localCardData, onExecuteAction]);

  return (
    <>
      {isLoading && <div>Generating card...</div>}
      <div ref={cardRef} />
    </>
  );
}

export default AdaptiveCardRenderer;
