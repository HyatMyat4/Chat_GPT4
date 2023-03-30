import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type Props = {
  model: string;
  prompt: string;
  chatId: string | number;
};

const query = async ({ model, prompt, chatId }: Props) => {
  const res = await openai
    .createCompletion({
      model: model,
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 3000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => console.warn(`Chat_GPT catch earr : ${err.message} `));
  return res;
};

export default query;
