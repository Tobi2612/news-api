import logger from "../utils/logger";
import { createClient } from "redis";
require('dotenv'). config();


const redisHost = process.env.REDIS_HOST;

const client = createClient({
    url: redisHost
});

export async function connectToRedis() {
    await client
        .connect()
        .then(() => {
            logger.debug("Connected to Redis....");
        })
        .catch(err => {
            logger.error("Error: ", err);
            throw err;
        });

    await setKey("connect","test", 1);

    client.once("error", err => console.log("Redis Client Error", err));
}

export async function setKey(key = "key", value:any, validity = 360) {
    logger.debug("Setting Client Key....");

    await client.set(key, value, { EX: 60 * validity });
}

export async function getByKey(key:string) {
    logger.debug("Getting Value by Key....");

    return await client.get(key);
}

export async function deleteKey(key:string) {
    logger.debug("Deleting Value....");

    await client.del(key);
}
