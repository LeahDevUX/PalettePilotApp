import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../server/db.js';
import Palette from '../../../../server/models/Palette.js';

// GET /api/palettes/:id — return a single palette by its id.
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid palette id.' }, { status: 400 });
    }

    await connectToDatabase();
    const palette = await Palette.findById(id);

    if (!palette) {
      return Response.json({ error: 'Palette not found.' }, { status: 404 });
    }

    return Response.json(palette, { status: 200 });
  } catch (error) {
    console.error('[palette GET by id error]', error);
    return Response.json({ error: 'Failed to load palette.' }, { status: 500 });
  }
}

// DELETE /api/palettes/:id — remove a palette by its id.
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid palette id.' }, { status: 400 });
    }

    await connectToDatabase();
    const deleted = await Palette.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json({ error: 'Palette not found.' }, { status: 404 });
    }

    return Response.json({ message: 'Palette deleted.' }, { status: 200 });
  } catch (error) {
    console.error('[palette DELETE error]', error);
    return Response.json({ error: 'Failed to delete palette.' }, { status: 500 });
  }
}
