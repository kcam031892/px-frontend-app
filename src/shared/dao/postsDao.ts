import { CONFIG } from 'shared/config';
import { useAxios } from 'shared/hooks/useAxios';
import { IPostResponsePayload } from 'shared/interfaces/IPost';
import { GET_POST, GET_POSTS } from 'shared/queries/posts';

const { POST } = useAxios();

export const usePostsDao = () => {
  const getPosts = async () => {
    const response = await POST<IPostResponsePayload>({
      url: CONFIG.API_URL,
      data: {
        query: GET_POSTS,
      },
    });

    return response.data;
  };

  const getPost = async (payload: any) => {
    const response = await POST({
      url: CONFIG.API_URL,
      data: {
        query: GET_POST,
        variables: {
          id: String(payload.id),
        },
      },
    });

    return response.data;
  };

  return {
    getPosts,
    getPost,
  };
};
