import { Queue, Worker, QueueEvents, JobsOptions } from "bullmq";
import Redis from "ioredis";
import { markCakeStatus } from "../services/cakeService";

const connection = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: null,
  }
);

type CakeJobData = { cakeId: string; cookingTime: number };

const queueName = "cake-queue";

export const cakeQueue = new Queue<CakeJobData>(queueName, { connection });
export const cakeQueueEvents = new QueueEvents(queueName, { connection });

export const addCakeToQueue = async (cakeId: string, cookingTime: number) => {
  const jobOptions: JobsOptions = {
    delay: 0,
    removeOnComplete: 100,
    removeOnFail: 100,
  };
  await cakeQueue.add("cook", { cakeId, cookingTime }, jobOptions);
};

// Worker: simulates cooking by waiting for cookingTime then marks as done
export const startCakeWorker = () => {
  const worker = new Worker<CakeJobData>(
    queueName,
    async (job) => {
      try {
        await markCakeStatus(job.data.cakeId, "cooking");
        const ms = Math.max(0, job.data.cookingTime ?? 3000);
        await new Promise((resolve) => setTimeout(resolve, ms));
        await markCakeStatus(job.data.cakeId, "done");
      } catch (err) {
        await markCakeStatus(job.data.cakeId, "failed");
        throw err;
      }
    },
    { connection }
  );

  worker.on("failed", (job, err) => {
    console.error("Cake job failed", job?.id, err);
  });

  return worker;
};
