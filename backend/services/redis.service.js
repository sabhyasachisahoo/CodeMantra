// import Redis from 'ioredis';
// import dotenv from 'dotenv';

// dotenv.config();

// const redisClient = new Redis(process.env.REDIS_URL,{
//   tls: {}
// }); // no TLS

// redisClient.on('connect', () => {
//   console.log('✅ Redis connected successfully');
// });

// redisClient.on('error', (err) => {
//   console.error('❌ Redis connection error:', err);
// });

// export default redisClient;

import Redis from 'ioredis';


const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default redisClient;