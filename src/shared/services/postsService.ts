import { useQuery } from 'react-query';
import { usePostsDao } from 'shared/dao/postsDao';
import { IPostResponsePayload } from 'shared/interfaces/IPost';

const { getPosts: getPostsDao, getPost: getPostDao } = usePostsDao();
export const usePostsService = () => {
  const getPosts = () => {
    return useQuery<IPostResponsePayload, Error>(['posts'], () => getPostsDao());
  };

  const getPost = (payload: any) => {
    return useQuery(['post', payload], () => getPostDao(payload));
  };
  return {
    getPosts,
    getPost,
  };
};
