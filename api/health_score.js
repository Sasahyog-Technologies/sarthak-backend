const express = require("express");
const OpenAI = require("openai"); // ✅ CommonJS-compatible import

const router = express.Router();

router.post("/healthscore", async (req, res) => {
  const {
    businessName,
    businessType,
    website,
    social,
    contact,
    tool,
    market,
  } = req.body;

  // Optional validation
  if (!businessName || !businessType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const prompt = `
You are an expert digital business consultant and give a standardized report with proper headings and bullets.

Here is the business information:
•⁠  ⁠Business Name: ${businessName}
•⁠  ⁠Business Type: ${businessType}
•⁠  ⁠Has Website: ${website}
•⁠  ⁠Active on Social Media: ${social}
•⁠  ⁠Collecting Customer Info: ${contact}
•⁠  ⁠Using CRM/Digital Tools: ${tool}
•⁠  ⁠Current Marketing Method: ${market}

Give a detailed but crisp Digital Health Checkup covering:
•⁠  ⁠Digital Health Score (out of 10)
•⁠  ⁠Strengths
•⁠  ⁠Weaknesses
•⁠  ⁠3 Priority Fixes
•⁠  ⁠Quick 30-day Digital Action Plan
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional digital consultant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const digitalScoreReport = completion.choices[0].message.content;

    res.status(200).json({ report: digitalScoreReport });
  } catch (error) {
    console.error("❌ OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate digital health report." });
  }
});

router.post("/healthscore", async (req, res) => {
  // return a mocked response for testing
  return res.status(200).json({
    report: "✅ This is a mocked brainstorm report. Everything is working fine locally!",
  });
});


module.exports = router;
