import mongoose from 'mongoose';

// In Next.js dev mode the server reloads modules frequently. Without caching,
// every reload would open a brand-new database connection and quickly exhaust
// the connection pool. We store the connection on a global object so it is
// reused across reloads.
let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { connection: null, promise: null };
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }

  // Already connected — reuse it.
  if (cached.connection) {
    return cached.connection;
  }

  // A connection attempt is already in progress — wait for it instead of
  // starting a second one.
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri);
  }

  cached.connection = await cached.promise;
  return cached.connection;
}
