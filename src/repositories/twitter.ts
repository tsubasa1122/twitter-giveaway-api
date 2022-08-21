import dayjs from "dayjs";
import { TwitterHttpClient } from "../infrastructure/http/twitterHttpClient";
import Tweet from "../models/tweet";

/**
 * Twitter api(user周り)との接続を集約し、具体的なやりとりを隠蔽するクラス
 * @param TwitterHttpClient TwitterのAPI Client
 */
export default class TwitterRepository {
  constructor(private client: TwitterHttpClient) {}

  async searchTweets(keyword: string): Promise<Tweet[]> {
    // 一日分のツイートを取得する
    const until = dayjs().subtract(1, "day").startOf("day").toISOString();
    const since = dayjs().subtract(2, "day").startOf("day").toISOString();

    // お気に入りとリツイート数が100件以上のツイートを取得する
    // keywordのみURIエンコードする。それ以外をエンコードすると期待する値が返ってこない。
    const query = `(${encodeURIComponent(
      keyword
    )}) min_faves:100 min_retweets:100 -filter:replies until:${until} since:${since}`;

    const params = {
      q: query,
      count: "10",
    };

    // TODO: レスポンスに型を付ける
    const response = (await this.client.get(
      "/search/tweets.json",
      params
    )) as any;

    // if (!response.data) return [];

    // console.log(response);
    // return response.data.map(
    //   (res) => new Tweet(res.id, res.author_id, res.text)
    // );

    return response;
  }
}
