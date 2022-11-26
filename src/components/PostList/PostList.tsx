import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'
import PostItem from '../PostItem/PostItem';

export default function PostList() {
  const posts = useAppSelector(state => state.posts.list);

  return (
    <>
      <div style={{ marginBottom: "1.5em", fontSize: "1.4em" }}><Link to={"/createPost"}>Create new post</Link></div>
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            {...post}
          />
        ))}
      </div>
    </>
  )
}
