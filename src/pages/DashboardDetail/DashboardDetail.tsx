import React from 'react';
import { useParams } from 'react-router-dom';
import { usePostsService } from 'shared/services/postsService';

const { getPost } = usePostsService();
const DashboardDetail = () => {
  const { id }: { id: string } = useParams();
  const { data, isLoading } = getPost({ id });
  return <div>{isLoading ? <h1>Loading..</h1> : JSON.stringify(data)}</div>;
};

export default DashboardDetail;
