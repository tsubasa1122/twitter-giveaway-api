import dayjs from "dayjs";
import Client from "twitter-api-sdk";
import Tweet from "../models/tweet";

/**
 * Twitter api(user周り)との接続を集約し、具体的なやりとりを隠蔽するクラス
 * @param client TwitterのAPI Client
 */
export default class TwitterRepository {
  constructor(private client: Client) {}

  async searchTweets(keyword: string): Promise<Tweet[]> {
    // 引用リツイート・リツイート・リプライのツイートを取り除く
    const query = `${keyword} -is:quote -is:reply -is:retweet`;
    // 一日分のツイートを取得する
    const start_time = dayjs().subtract(1, "day").startOf("day").toISOString();
    const response = await this.client.tweets.tweetsRecentSearch({
      query: query,
      max_results: 100,
      expansions: ["author_id"],
      "tweet.fields": ["text"],
      start_time: start_time,
    });

    if (!response.data) return [];

    console.log(response);
    return response.data.map(
      (res) => new Tweet(res.id, res.author_id, res.text)
    );
  }
}
