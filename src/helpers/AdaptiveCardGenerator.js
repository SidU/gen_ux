const openai = require('openai-api');
const openai_api_key = process.env.OPENAI_API_KEY || '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';
const openai_api = new openai(openai_api_key);

const generateAdaptiveCard = async (cardDescription, retries = 3) => {
  let error = null;

  const prompt = `As an Adaptive Card Generator AI, I need to create an Adaptive Card to: <desc>${cardDescription}</desc>
  ${
    retries > 0 && error ? ` An error occurred earlier: ${error.message}. Please retry.` : ''
  }
  
  Adaptive Card JSON:`;

  let cardData = null;

  try {

    const response = await openai_api.complete({
      engine: 'text-davinci-003',
      prompt: prompt,
      maxTokens: 2000,
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    });

    cardData = JSON.parse(response.data.choices[0].text);
    return cardData;

  } catch (err) {

    error = err;
    if (retries > 0) {
      console.error(error);
      console.log(cardData);
      return generateAdaptiveCard(cardDescription, retries - 1);
    } else {
      throw error;
    }
  }
};

module.exports = generateAdaptiveCard;
