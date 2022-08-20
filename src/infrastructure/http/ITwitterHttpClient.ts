export type ITwitterHttpClient = {
  get<T>(path: string, query: string): Promise<T>;
};
