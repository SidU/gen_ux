import React, { useEffect, useRef, useState } from 'react';
import { AdaptiveCard, HostConfig } from 'adaptivecards';
import generateAdaptiveCard from '../helpers/AdaptiveCardGenerator';

function AdaptiveCardRenderer(props) {
  const { cardDescription, onExecuteAction } = props;
  const cardRef = useRef();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const getCardData = async () => {
      const data = await generateAdaptiveCard(cardDescription);
      setCardData(data);
    };

    getCardData();
  }, [cardDescription]);

  useEffect(() => {
    if (cardData) {
      const adaptiveCard = new AdaptiveCard();

      adaptiveCard.onExecuteAction = function(action) {
        if (onExecuteAction) {
          onExecuteAction(action);
        }
      };

      adaptiveCard.parse(cardData);

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
      cardRef.current.appendChild(renderedCard);
    }
  }, [cardData, onExecuteAction]);

  return <div ref={cardRef} />;
}

export default AdaptiveCardRenderer;