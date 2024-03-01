export interface IPost {
  title: string;
  body: string;
  authorId: string;
  thumbnail: string;
  tags: string[]; // tag ids referencing the Tag model
}

export interface IPostCreatePayload extends Pick<IPost, 'title' | 'body' | 'thumbnail'> {}
