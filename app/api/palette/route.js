import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function buildPrompt(brandDescription) {
  return `You are a professional brand color consultant. Generate a color palette for the following brand description:

"${brandDescription}"

Respond with ONLY a valid JSON object in this exact format, no extra text:
{
  "palette": [
    {
      "hex": "#RRGGBB",
      "name": "Color Name",
      "role": "Primary / Secondary / Accent / Background / Text",
      "insight": "One sentence explaining why this color fits the brand."
    }
  ],
  "summary": "One sentence describing the overall palette mood."
}

Rules:
- Exactly 5 colors
- HEX values must be valid (e.g. #1A2B3C)
- Names should be evocative, not generic (not just "Blue")
- Roles: one Primary, one Secondary, one Accent, one Background, one Text
- Keep insights short and specific to the brand`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim().length === 0) {
      return Response.json(
        { error: 'Brand description is required.' },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: buildPrompt(prompt) }],
      temperature: 0.7,
    });

    const rawText = completion.choices[0].message.content;
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const paletteData = JSON.parse(cleaned);

    return Response.json(paletteData, { status: 200 });
  } catch (error) {
    console.error('[palette API error]', error);

    if (error instanceof SyntaxError) {
      return Response.json(
        { error: 'AI returned an unexpected format. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json(
      { error: error.message || 'Failed to generate palette. Please try again.' },
      { status: 500 }
    );
  }
}
