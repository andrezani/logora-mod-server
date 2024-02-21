const express = require("express");
const axios = require("axios");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Helper function to handle common parts of moderation functions
async function getModerationResult(endpoint, text, language) {
  const acceptedLanguages = ["en-US", "de-DE", "fr-FR", "es-ES"];

  if (!acceptedLanguages.includes(language)) {
    throw new Error(`Invalid language code.`);
  }

  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("Invalid text input.");
  }

  const response = await axios.get(
    `https://moderation.logora.fr/${endpoint}?text=${encodeURIComponent(
      text
    )}&language=${language}`
  );

  return response.data;
}

// Endpoint for predicting moderation outcome
app.get("/api/moderation/predict", async (req, res) => {
  try {
    const { text, language } = req.query;
    const data = await getModerationResult("predict", text, language);
    const probability = data.prediction["0"];
    const isSafe = probability < 0.9;
    res.json({ probability, isSafe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for getting moderation score
app.get("/api/moderation/score", async (req, res) => {
  try {
    const { text, language } = req.query;
    const data = await getModerationResult("score", text, language);
    const score = data.score;
    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server if not imported as a module
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// Export Express app
module.exports = app;
