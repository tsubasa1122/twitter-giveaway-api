import axios from "axios";
import { ITwitterHttpClient } from "./ITwitterHttpClient";

export class TwitterHttpClient implements ITwitterHttpClient {
  TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
  BASE_URL = "https://api.twitter.com/1.1/search/tweets";

  TWITTER_API_URL = `${this.BASE_URL}`;

  defaultHeaderOptions = {
    Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`,
    ContentType: "application/json",
  };

  private readonly axios = axios.create({
    baseURL: this.TWITTER_API_URL,
    headers: this.defaultHeaderOptions,
  });

  get = async <T>(path: string, query: string): Promise<T> => {
    const response = await this.axios.get(path, { params: { q: query } });
    return response.data;
  };
}
