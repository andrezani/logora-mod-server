const express = require("express");
const axios = require("axios");

// Initialize Express app
const app = express();
const port = 3000;

// Endpoint for predicting moderation outcome
app.get("/api/moderation/predict", async (req, res) => {
  try {
    const { text, language } = req.query;
    const prediction = await getModerationPrediction(text, language);
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for getting moderation score
app.get("/api/moderation/score", async (req, res) => {
  try {
    const { text, language } = req.query;
    const score = await getModerationScore(text, language);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to get moderation prediction
async function getModerationPrediction(text, language) {
  const acceptedLanguages = ["en-US", "de-DE", "fr-FR", "es-ES"];

  if (!acceptedLanguages.includes(language)) {
    throw new Error(`Invalid language code.`);
  }

  try {
    const response = await axios.get(
      `https://moderation.logora.fr/predict?text=${text}&language=${language}`
    );

    const probability = response.data.prediction["0"];
    const isSafe = probability < 0.9;

    return { probability, isSafe };
  } catch (error) {
    throw error;
  }
}

// Function to get moderation score
async function getModerationScore(text, language) {
  const acceptedLanguages = ["en-US", "de-DE", "fr-FR", "es-ES"];

  if (!acceptedLanguages.includes(language)) {
    throw new Error(`Invalid language code.`);
  }

  try {
    const response = await axios.get(
      `https://moderation.logora.fr/score?text=${text}&language=${language}`
    );

    const score = response.data.score;

    return { score };
  } catch (error) {
    throw error;
  }
}

// Start server if not imported as a module
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// Export Express app
module.exports = app;
