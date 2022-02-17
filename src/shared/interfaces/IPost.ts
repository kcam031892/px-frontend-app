export interface IPost {
  id: string;
  title: string;
}
export interface IPostResponsePayload {
  data: {
    posts: {
      data: IPost[];
    };
  };
}
