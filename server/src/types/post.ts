export interface IPost {
  title: string;
  body: string;
  authorId: string;
  thumbnail: string;
}

export interface IPostCreatePayload extends Pick<IPost, 'title' | 'body' | 'thumbnail'> {}
