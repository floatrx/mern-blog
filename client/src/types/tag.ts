interface ITagBase {
  name: string;
}

export interface ITag {
  id: string;
  name: string;
}

export interface ITagCreate extends ITagBase {}

export interface ITagUpdate extends Partial<ITagBase> {}

export interface ITagDelete {
  id: string;
}

export interface ITagList extends FindResponse<ITag> {}
