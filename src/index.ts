import express, { Response } from "express";
import Router from "express-promise-router";
import dotenv from "dotenv";
import cors from "cors";
import Client from "twitter-api-sdk";

dotenv.config();
const app = express();
const router = Router();
const PORT = 8000;

app.use(express.json());

// TODO: 許可するドメインだけに絞る
app.use(cors());

router.get("/hc", (_, res: Response) => res.send("ok"));

if (!process.env.TWITTER_BEARER_TOKEN)
  throw new Error("ツイッターのtokenが設定されていません。");
const twitterClient = new Client(process.env.TWITTER_BEARER_TOKEN);

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));