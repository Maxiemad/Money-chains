import { MongoClient, type Collection } from "mongodb";

/**
 * MongoDB connection (cached across hot-reloads / warm serverless instances).
 *
 * The whole app state is stored as a single "singleton" document in the
 * `state` collection (see store.ts). This keeps persistence simple and atomic
 * for an MVP while still surviving restarts/deploys. If no URI is configured,
 * getStateCollection() returns null and the app falls back to in-memory data.
 */
const URI = process.env.MONEY_CHAIN_DB_MONGODB_URI;
const DB_NAME = process.env.MONEY_CHAIN_DB_NAME || "moneychains";

interface StateDoc {
  _id: string;
  data: unknown;
}

const g = globalThis as unknown as {
  __mcMongo?: Promise<MongoClient> | null;
};

function clientPromise(): Promise<MongoClient> | null {
  if (!URI) return null;
  if (!g.__mcMongo) {
    g.__mcMongo = new MongoClient(URI, {
      serverSelectionTimeoutMS: 8000,
    }).connect();
  }
  return g.__mcMongo;
}

export async function getStateCollection(): Promise<Collection<StateDoc> | null> {
  const cp = clientPromise();
  if (!cp) return null;
  try {
    const client = await cp;
    return client.db(DB_NAME).collection<StateDoc>("state");
  } catch {
    // Connection failed → caller falls back to in-memory.
    g.__mcMongo = null;
    return null;
  }
}

export const STATE_ID = "singleton";
