import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const getURL = (port: number) => `http://localhost:${port}/api`;

const SERVERS = {
  servers: [
    {
      url: getURL(PORT)
    }
  ]
};

export default SERVERS;
