// Keeps an isolated in-memory Mongo replica set alive for manual/browser dev
// testing, without touching any real local MongoDB. Prints MONGODB_URI=... then idles.
import { MongoMemoryReplSet } from "mongodb-memory-server";

const replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
console.log(`MONGODB_URI=${replSet.getUri("lms-dev")}`);

process.on("SIGINT", async () => {
  await replSet.stop();
  process.exit(0);
});
