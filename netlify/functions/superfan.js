export default async (req) => {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const headers = { "Content-Type": "application/json" };
  try {
    const { inputs } = await req.json();

    const prompt = `
You are “The Superfan Guide.” 
Use the answers to create:
- <h3>Superfan Snapshot</h3> (5–8 bullets)
- <h3>Superfan Story</h3> (150–200 words, warm & clear)
- <h3>Positioning Statement</h3> (1 line)
- <h3>Headline Ideas</h3> (3 short)
- <h3>Message Starters</h3> (5 short)

Inputs:
${JSON.stringify(inputs, null, 2)}
`;

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.1-mini",
        input: prompt,
        max_output_tokens: 800
      })
    });

    const data = await r.json();
    const html = (data.output?.[0]?.content?.[0]?.text || "").trim();

    return new Response(JSON.stringify({ html }), { status: 200, headers });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers });
  }
};
