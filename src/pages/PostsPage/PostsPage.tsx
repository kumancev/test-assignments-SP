import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PostList from '../../components/PostList/PostList';
import { Loader } from '../../components/Skeleton/Skeleton';
import { fetchPosts } from '../../features/posts/postsSlice';

export default function PostsPage() {
  const { loading, error } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {loading ? <Loader /> : <PostList />}
      {error && <p>An error occured: {error}</p>}

    </>
  )
}
