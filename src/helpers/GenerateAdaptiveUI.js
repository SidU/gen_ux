const openai = require('openai-api');

const generateAdaptiveUI = async (openAIApiKey, appDescription, userAction, prevUIDescription, retries = 3) => {

  // OpenAI API Key is required
  if (!openAIApiKey) throw new Error('OpenAI API Key is required');

  let error = null;

  const prompt = `You are a ${appDescription} app AI.

  Your current memory:
  ${prevUIDescription?.memory?.length > 0 ? JSON.stringify(prevUIDescription?.memory) : "[]"}

  Your current user interface shown to user:
  - nextUI: ${prevUIDescription?.nextUISummary}
  - currentStateUI: ${prevUIDescription?.currentStateUISummary}
  - globalActions: ${prevUIDescription?.globalActionsSummary}

  Your response must be in the form of JSON as shown below
  {
    /* memory: JSON array representing what is in your memory */
    "memory": [],

    /* nextUI: Adaptive Card JSON to allow user to take the next step. Must provide Submit action. */
    "nextUI": {},
    "nextUISummary": "Plain text description of the Adaptive Card JSON in nextUI",

    /* currentStateUI: Adaptive Card JSON to show what is your memory */
    "currentStateUI": {},
    "currentStateUISummary": "Plain text description of the Adaptive Card JSON in currentStateUI",

    /* globalActions: Adaptive Card JSON to show actions that are always applicable. Must provide Submit action. */
    "globalActions": {},
    "globalActionsSummary": "Plain text description of the Adaptive Card JSON in globalActions"
  }

  Note:
  - Adaptive Card JSONs in nextUI and globalActions must have a submit action to allow user to take action.
  - The value property of each element should contain the corresponding title of element.
  - Ensure all input controls have labels.

  ${retries > 0 && error ? ` An error occurred earlier: ${error.message}. Please retry.` : ''}

  User action:
  ${JSON.stringify(userAction?.data)}

  Your response:`;

  console.log(prompt);

  let uiDescription = null;

  try {

    const openai_api = new openai(openAIApiKey);

    const response = await openai_api.complete({
      engine: 'text-davinci-003',
      prompt: prompt,
      maxTokens: 2600,
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    });

    console.log(response.data.choices[0].text);

    uiDescription = JSON.parse(response.data.choices[0].text);

    return uiDescription;

  } catch (err) {

    error = err;

    if (retries > 0) {

      console.error(error);
      console.log(uiDescription);

      return generateAdaptiveUI(appDescription, userAction, prevUIDescription, retries - 1);

    } else {
      throw error;
    }
  }
};

module.exports = generateAdaptiveUI;
