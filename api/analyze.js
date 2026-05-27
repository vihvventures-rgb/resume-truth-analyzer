export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "deepseek/deepseek-chat",

          messages: [
            {
              role: "user",
              content: `
Analyze this resume and give:

1. ATS Score out of 100
2. Top strengths
3. Weaknesses
4. Missing keywords
5. Suggested improvements

Resume:

${JSON.stringify(req.body)}
              `
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

}
