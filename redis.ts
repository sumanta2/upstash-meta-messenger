import Redis from "ioredis";

const redis=  new Redis(process.env.REDIS_URL!)  //vdo:54:06

export default redis;