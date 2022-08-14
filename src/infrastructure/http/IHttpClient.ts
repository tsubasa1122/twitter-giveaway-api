export type IHttpClient = {
  // TODO: paramsの型をちゃんと定義する
  get<T>(path: string, params: any): Promise<T>;
};
