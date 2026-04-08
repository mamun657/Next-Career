const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'skillbridge-jwt-secret-change-in-production',
  mongodbUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  openaiApiKey: process.env.OPENAI_API_KEY || null,
  geminiApiKey: process.env.GEMINI_API_KEY || null,
  groqApiKey: process.env.GROQ_API_KEY || null,
};
