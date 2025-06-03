import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import axios from 'axios';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3040;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
  console.log('Connected to MongoDB');
  })
  .catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  })

// Connect to Redis

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient
  .on('error', (err) => console.error('Redis Client Error', err))
  .on('connect', () => console.log('Connected to Redis'))
  .on('ready', () => console.log('Redis Client Ready'))
  .on('end', () => console.log('Redis Client Ended'))
  .on('reconnecting', (err) => console.error('Redis Client Reconnecting', err))
  .connect()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!, This is not my first Express App, but my first real express dockerized App</h1>');
});

app.get('/photos', async (req, res) => {
  const photosKey = 'photos';

  try {
    // Try to get the photos from Redis first
    const cachedPhotos = await redisClient.get(photosKey);

    if (cachedPhotos) {
      // If the photos are in Redis, send them to the client
      console.log('Photos found in Redis');
      return res.json(JSON.parse(cachedPhotos));
    } else {
      // If the photos are not in Redis, fetch them from the API
      console.log('Photos not found in Redis, fetching from API');
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      const photos = response.data;

      // Save the photos in Redis
      await redisClient.set(photosKey, JSON.stringify(photos), {
        EX: 3600, // Set the expiration time to 1 hour
        NX: true, // Only set the key if it does not already exist
      });

      // Send the photos to the client
      return res.json(photos);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching photos' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});