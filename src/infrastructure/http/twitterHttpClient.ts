import axios from "axios";
import { ITwitterHttpClient } from "./ITwitterHttpClient";

export type TwitterQueryParams = {
  q: string;
  count: number;
  since_id: string;
  max_id: string;
};

export class TwitterHttpClient implements ITwitterHttpClient {
  private TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
  private BASE_URL = "https://api.twitter.com/1.1/search/tweets";
  private TWITTER_API_URL = `${this.BASE_URL}`;
  private defaultHeaderOptions = {
    Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`,
    ContentType: "application/json",
  };

  private readonly axios = axios.create({
    baseURL: this.TWITTER_API_URL,
    headers: this.defaultHeaderOptions,
  });

  get = async <T>(path: string, params: TwitterQueryParams): Promise<T> => {
    const response = await this.axios.get(path, { params: params });
    return response.data;
  };
}
