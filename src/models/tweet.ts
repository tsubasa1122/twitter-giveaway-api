export default class Tweet {
  public id: string;
  public author_id: string | undefined;
  public text: string;
  public url: string;

  constructor(id: string, author_id: string | undefined, text: string) {
    this.id = id;
    this.author_id = author_id;
    this.text = text;
    this.url = `https://twitter.com/${author_id}/status/${id}`;
  }
}
