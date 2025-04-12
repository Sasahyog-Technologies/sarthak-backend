const express = require("express");
const OpenAI = require("openai"); // ✅ CommonJS-compatible import

const router = express.Router();

// // POST /api/brainstorm
// router.post("/brainstorm", async (req, res) => {
//   const { journey, businessIdea, businessType, customers, location, challenges } = req.body;

//   if (!journey || !businessIdea || !businessType || !customers || !location || !challenges) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const openai = new OpenAI({
//     apiKey: '',
//   });

//   try {
//     const prompt = `
// You are an expert startup advisor.

// Here is the user's idea:
// •⁠  ⁠Stage: ${journey}
// •⁠  ⁠Idea: ${businessIdea}
// •⁠  ⁠Business Type: ${businessType}
// •⁠  ⁠Customer Type: ${customers}
// •⁠  ⁠Launch Location: ${location.country}, ${location.region}, ${location.city}
// •⁠  ⁠Challenges: ${challenges.join(", ")}

// Give a detailed but crisp Founder Brainstorm Report covering:
// •⁠  ⁠Idea Rating (Score out of 10 + Reason)
// •⁠  ⁠2 Pros
// •⁠  ⁠2 Cons
// •⁠  ⁠Location Suitability Analysis
// •⁠  ⁠2 Solutions for Challenges
// •⁠  ⁠2 Tech/Growth Tips
// •⁠  ⁠Encourage to book a consultation.
// `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a professional startup mentor." },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//     });

//     const brainstormReport = completion.choices[0].message.content || "No report generated.";
//     return res.status(200).json({ report: brainstormReport });

//   } catch (error) {
//     console.error("❌ OpenAI API Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       message: "Something went wrong generating report.",
//       error: error.message,
//     });
//   }
// });

router.post("/roadmap", async (req, res) => {
  // return a mocked response for testing
  return res.status(200).json({
    report: "✅ This is a mocked brainstorm report. Everything is working fine locally!",
  });
});


module.exports = router;
