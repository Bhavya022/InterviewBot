const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { chats, model } = req.body;
  console.log(model);
  try {
    const response = await openai.createCompletion({
      model: `${model}`,
      prompt: `${chats}`,
      max_tokens: 1000,
      temperature: 1,
    });
    res.json({ chat: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/", async (req, res) => {
  const response = await openai.listModels();
  res.json({ model: response.data.data });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
