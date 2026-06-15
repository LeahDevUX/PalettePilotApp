import mongoose from 'mongoose';

// A valid HEX color, e.g. #1A2B3C
const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;

// One color inside a palette. Defined as a sub-schema so each color is
// validated individually. _id is disabled because a color is not an
// independent document.
const colorSchema = new mongoose.Schema(
  {
    hex: {
      type: String,
      required: true,
      match: [HEX_REGEX, 'hex must be a valid color like #1A2B3C'],
    },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    role: {
      type: String,
      required: true,
      enum: ['Primary', 'Secondary', 'Accent', 'Background', 'Text'],
    },
    usage: { type: String, trim: true, maxlength: 300 },
    reason: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const paletteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    prompt: { type: String, required: true, trim: true, maxlength: 2000 },
    brandSummary: { type: String, trim: true, maxlength: 500 },
    emotion: { type: String, trim: true, maxlength: 120 },
    palette: {
      type: [colorSchema],
      validate: {
        validator: (colors) => colors.length === 5,
        message: 'A palette must contain exactly 5 colors',
      },
    },
    designNotes: [{ type: String, maxlength: 500 }],
    status: {
      type: String,
      enum: ['saved', 'draft', 'archived'],
      default: 'saved',
    },
  },
  // timestamps adds createdAt and updatedAt automatically.
  { timestamps: true }
);

// In Next.js the model file can be imported many times. mongoose.model() throws
// if a model is compiled twice, so we reuse the existing one if it exists.
export default mongoose.models.Palette || mongoose.model('Palette', paletteSchema);
