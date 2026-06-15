import { connectToDatabase } from '../../../server/db.js';
import Palette from '../../../server/models/Palette.js';

// GET /api/palettes — return all saved palettes, newest first.
export async function GET() {
  try {
    await connectToDatabase();
    const palettes = await Palette.find().sort({ createdAt: -1 });
    return Response.json(palettes, { status: 200 });
  } catch (error) {
    console.error('[palettes GET error]', error);
    return Response.json(
      { error: 'Failed to load palettes.' },
      { status: 500 }
    );
  }
}

// POST /api/palettes — save a new palette.
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Mongoose validates the body against the schema. Invalid data throws
    // a ValidationError, which we turn into a 400 below.
    const palette = await Palette.create(body);
    return Response.json(palette, { status: 201 });
  } catch (error) {
    console.error('[palettes POST error]', error);

    if (error.name === 'ValidationError') {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(
      { error: 'Failed to save palette.' },
      { status: 500 }
    );
  }
}
