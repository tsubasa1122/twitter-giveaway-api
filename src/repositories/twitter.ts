import Client from "twitter-api-sdk";

/**
 * Twitter api(user周り)との接続を集約し、具体的なやりとりを隠蔽するクラス
 * @param client TwitterのAPI Client
 */
export default class TwitterRepository {
  constructor(private client: Client) {}

  async searchTweets(query: string): Promise<[]> {
    const response = await this.client.tweets.tweetsRecentSearch({
      query: query,
      max_results: 100,
      expansions: ["author_id"],
      "user.fields": ["id", "name", "username", "description"],
    });

    if (!response.includes) return [];

    // #TODO: Tweetモデルのオブジェクトを返す
    return [];
  }
}
