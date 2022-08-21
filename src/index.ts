import express, { Response } from "express";
import Router from "express-promise-router";
import dotenv from "dotenv";
import cors from "cors";
import TwitterRepository from "./repositories/twitter";
import { TwitterHttpClient } from "./infrastructure/http/twitterHttpClient";

dotenv.config();
const app = express();
const router = Router();
const PORT = 8000;

app.use(express.json());

const corsOptions = {
  origin: process.env.BASE_URL,
  method: "GET",
};

app.use(cors(corsOptions));

router.get("/hc", (_, res: Response) => res.send("ok"));

router.get("/", async (_, res: Response) => {
  const twitterClient = new TwitterHttpClient();
  const twitterRepository = new TwitterRepository(twitterClient);
  const tweets = await twitterRepository.searchTweets("#giveaway");
  res.status(200).json(tweets);
});

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
