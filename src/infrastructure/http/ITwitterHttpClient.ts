import { TwitterQueryParams } from "./twitterHttpClient";

export type ITwitterHttpClient = {
  get<T>(path: string, query: TwitterQueryParams): Promise<T>;
};
