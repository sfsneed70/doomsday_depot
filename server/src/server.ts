import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticateToken } from "./utils/auth.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

import cors from "cors";

import { ChatOpenAI } from "@langchain/openai";

import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

// Chatbot apikeytest
if (!apiKey) {
  console.error('OPENAI_API_KEY is not defined. Exiting...');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db;
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Initialize the ChatOpenAI model
  const model = new ChatOpenAI({
    openAIApiKey: apiKey,
    modelName: "gpt-3.5-turbo",
  });

  // Add the /api/chat endpoint
  app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage); // Debugging statement

    try {
      // Generate AI response using ChatOpenAI model
      const aiResponse = await model.call([
        { role: 'user', content: userMessage },
      ]);

      console.log('AI response:', aiResponse); // Debugging statement
      res.send({ message: aiResponse.text });
    } catch (error) {
      console.error('Error generating AI response:', error);
      res.status(500).send('Error generating AI response');
    }
  });

  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    }),
  );

  // if we're in production, serve client/dist as static assets so everything works off one port,
  // no more dev server on client.

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist")));

    // necessary for client-side routing to work
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
    });
  }

  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
