import { Collection, MongoClient } from "mongodb";

export const collections: {
  teachers?: Collection;
} = {};

async function getMongoClient() {
  // Connect db
  //@ts-ignore
  if (!global.mongoClientPromise) {
    const client = new MongoClient(process.env.MONGO_URL || "");
    //@ts-ignore
    global.mongoClientPromise = client.connect().then((client) => client);
  }
  //@ts-ignore
  return global.mongoClientPromise;
}

export async function getMongoDb(dbName = "thesis") {
  const mongoClient = await getMongoClient();
  return mongoClient.db(dbName);
}
