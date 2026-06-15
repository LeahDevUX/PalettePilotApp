import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function buildPrompt(brandDescription) {
  return `You are an expert Senior Brand Identity Designer and Color Systems Specialist.
Your job is to generate a professional, usable brand color palette based on the user's brand description.
Think like a real designer working in a studio — make intentional decisions, not random choices.

## BRAND DESCRIPTION
"${brandDescription}"

## STEP 1 — Internal Brand Analysis (do NOT output this)
Identify:
- Core emotion (trust, excitement, calm, luxury, urgency, playfulness, etc.)
- Industry context (fintech, food, fashion, SaaS, education, etc.)
- Target audience profile
- Brand personality (modern, premium, friendly, bold, minimal, etc.)

## STEP 2 — Color Strategy (do NOT output this)
Choose:
- A color harmony system: analogous / complementary / triadic / monochromatic
- Apply the 60-30-10 rule: Primary (60%) — Secondary (30%) — Accent (10%)
- Ensure sufficient contrast for accessibility (WCAG guidelines)

## STEP 3 — Output
Return ONLY a valid JSON object. No extra text, no markdown fences.

{
  "brandSummary": "One sentence describing the brand essence",
  "emotion": "The primary emotion this palette conveys",
  "palette": [
    {
      "hex": "#RRGGBB",
      "name": "Evocative color name (not just 'Blue')",
      "role": "Primary",
      "usage": "Where and how this color is used in the UI",
      "reason": "Why this color fits the brand psychologically and visually"
    }
  ],
  "designNotes": [
    "Note about contrast and accessibility",
    "Note about the harmony system used",
    "Note about how this palette differs from competitors"
  ]
}

## RULES
- Exactly 5 colors in palette
- Roles: one Primary, one Secondary, one Accent, one Background, one Text
- HEX values must be valid (e.g. #1A2B3C)
- Colors must be harmonious and usable in a real UI
- Think like a professional brand designer, not a random color generator`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    // Never trust client input — check the type before using string methods,
    // otherwise a number or object would crash .trim().
    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return Response.json(
        { error: 'Brand description is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    // Cap the length so a huge input can't run up the AI usage bill.
    if (prompt.length > 2000) {
      return Response.json(
        { error: 'Brand description is too long (max 2000 characters).' },
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
