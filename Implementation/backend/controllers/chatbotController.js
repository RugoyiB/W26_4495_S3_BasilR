const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.chatbotReply = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Please enter a question." });
    }

    // Ensure church content is loaded
    if (!global.churchContent || global.churchContent.trim().length === 0) {
      return res.json({
        reply: "Church information is still loading. Please try again shortly."
      });
    }

    // SYSTEM PROMPT: restrict chatbot to church info only
    const systemPrompt = `
You are a church information assistant.
You must answer ONLY using the information provided below.
If the answer is not found in the content, respond with:
"I’m sorry, I can only answer questions related to church information available on our website."

CHURCH WEBSITE CONTENT:
${global.churchContent}
`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.2
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res.status(500).json({
      reply: "The chatbot is currently unavailable. Please try again later."
    });
  }
};
