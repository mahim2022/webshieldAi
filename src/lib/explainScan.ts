import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "WebShield",
  },
});

export async function explainScan(issues: {
  missingHeaders: string[];
  corsOpen: boolean;
  xssDetected: boolean;
  sqliDetected: boolean;
}) {
  const prompt = `
You are a cybersecurity assistant. A website scan returned the following results:

${JSON.stringify(issues, null, 2)}

Explain in simple, non-technical language what these issues mean and what actions the website owner should take.
`;

  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1:free", // you can switch to mistral or llama2
    messages: [
      { role: "system", content: "You are a helpful cybersecurity assistant." },
      { role: "user", content: prompt },
    ],
  });

  return completion.choices[0].message.content;
}
