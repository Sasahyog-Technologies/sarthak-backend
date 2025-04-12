const express = require("express");
const OpenAI = require("openai"); // ✅ CommonJS-compatible import

const router = express.Router();

// POST /api/growth-roadmap
router.post("/roadmap", async (req, res) => {
  const {
    businessName,
    businessGoal,
    revenue,
    sale,
    investment,
    challenges,
  } = req.body;

  if (!businessName || !businessGoal || !revenue || !sale || !investment || !challenges) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const prompt = `
You are a business growth strategist.

Here is the user's business info:
•⁠  ⁠Business Name: ${businessName}
•⁠  ⁠12-month Goal: ${businessGoal}
•⁠  ⁠Current Monthly Revenue: ${revenue}
•⁠  ⁠Selling Channel: ${sale}
•⁠  ⁠Planning to Raise Investment: ${investment}
•⁠  ⁠Biggest Immediate Bottleneck: ${challenges}

Generate a detailed but crisp Growth Roadmap covering:
•⁠  ⁠3-Phase Plan (Start ➔ Stabilize ➔ Scale)
•⁠  ⁠2 Quick Wins in Next 30 Days
•⁠  ⁠2 Long-Term Scale Strategies
•⁠  ⁠Solution to the Immediate Bottleneck
•⁠  ⁠Strategy to Acquire First 100 Customers
•⁠  ⁠1 Motivational Mindset Tip for Founders
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a startup growth strategist." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const growthRoadmapReport = completion.choices[0].message.content;
    res.status(200).json({ report: growthRoadmapReport });

  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate growth roadmap.", error: error.message });
  }
});

router.post("/roadmap", async (req, res) => {
  // return a mocked response for testing
  return res.status(200).json({
    report: "✅ This is a mocked brainstorm report. Everything is working fine locally!",
  });
});


module.exports = router;
