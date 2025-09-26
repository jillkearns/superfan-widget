export default async () => {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return new Response(
      JSON.stringify({ ok: false, message: "No API key found!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // For safety, don’t return the whole key — just confirm it exists
  return new Response(
    JSON.stringify({ ok: true, message: "API key is set and ready 🎉" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
