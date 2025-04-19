const fetch = require('node-fetch');
const express = require('express');

const router = express();

router.post("/sendTemplate", async (req, res) => {
  const { name, phone, pdf } = req.body;

  try {
    const response = await fetch("https://waba2waba.com/api/v1/sendTemplateMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Key": "ce194551d1a64ceaa768541b39190314",
        "to": `91${phone}`,
        "languageCode": "en",
        "TemplateName": "founder_ai_studio",
        "headertype":"documents",
        "headertext":"text",
        "BodyParameter": [
          { "type": "text", "text": pdf }
        ],
        // If your template includes a clickable button, you can uncomment this:
        // "ButtonParameter": [
        //   { type: "url", text: "https://sasahyog-crm.vercel.app/auth/login" }
        // ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        message: "Failed to send template message",
        error: errorData,
      });
    }

    const responseData = await response.json();
    res.status(200).json({
      message: "Template message sent successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error sending template message:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;