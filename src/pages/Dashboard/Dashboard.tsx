import React from 'react';
import { CONFIG } from 'shared/config';
import { usePostsService } from 'shared/services/postsService';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';

const { getPosts } = usePostsService();
const Dashboard = () => {
  const { data, isLoading } = getPosts();
  console.log('data', CONFIG.API_URL);

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {data &&
            data.data.posts.data.map((post) => (
              <div>
                <Link to={`${ROUTES.DASHBOARD}/${post.id}`}>{post.title}</Link>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
