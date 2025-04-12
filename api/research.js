const express = require("express");
const OpenAI = require("openai");

const router = express.Router();


// POST /api/market-research
router.post("/research", async (req, res) => {
  const { business, audience, location, competitors, fear } = req.body;

  // Validation
  if (!business || !audience || !location || !competitors || !fear) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const prompt = `
You are a market research expert for startups.

Here is the user's input:
•⁠  ⁠Product/Service: ${business}
•⁠  ⁠Target Customers: ${audience}
•⁠  ⁠Launch Location: ${location}
•⁠  ⁠Known Competitors: ${competitors}
•⁠  ⁠Biggest Fear: ${fear}

Generate a Market Research Summary covering:
•⁠  ⁠Estimated Target Market Size
•⁠  ⁠Ideal Customer Persona
•⁠  ⁠2-3 Key Competitors and Gaps
•⁠  ⁠Unique Opportunity/Niche
•⁠  ⁠Location-specific Market Insight
•⁠  ⁠First Market Entry Strategy
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional market researcher." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const marketResearchReport = completion.choices[0].message.content;

    res.status(200).json({ report: marketResearchReport });

  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate market research.", error: error.message });
  }
});


router.post("/research", async (req, res) => {
  // return a mocked response for testing
  return res.status(200).json({
    report: "✅ This is a mocked brainstorm report. Everything is working fine locally!",
  });
});


module.exports = router;