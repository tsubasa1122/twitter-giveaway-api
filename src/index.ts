import express, { Response } from "express";
import Router from "express-promise-router";
import dotenv from "dotenv";
import cors from "cors";
import Client from "twitter-api-sdk";
import TwitterRepository from "./repositories/twitter";

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

if (!process.env.TWITTER_BEARER_TOKEN)
  throw new Error("ツイッターのtokenが設定されていません。");
const twitterClient = new Client(process.env.TWITTER_BEARER_TOKEN);

router.get("/", async (_, res: Response) => {
  const twitterRepository = new TwitterRepository(twitterClient);
  const tweets = await twitterRepository.searchTweets("#giveaway");
  res.status(200).json(tweets);
});

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
