interface IPostBase {
  title: string;
  body: string;
}

export interface IPost extends IPostBase {
  authorId: string;
  id: string;
}

export interface IPostCreate extends IPostBase {
  authorId: string;
}

export interface IPostUpdate extends Partial<IPostBase> {}

export interface IPostDelete {
  id: string;
}

export interface IPostList extends FindResponse<IPost> {}
