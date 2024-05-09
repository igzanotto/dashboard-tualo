const { Configuration, OpenAiApi} = require('openai');

const configuration = new Configuration({
    apiKey:  process.env.OPENAI_API_KEY
});

const openai = new OpenAiApi(configuration);

export default openai;