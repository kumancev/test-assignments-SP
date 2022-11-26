import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchComments } from '../../features/comments/commentsSlice';
import { getPost } from '../../features/posts/postsSlice';
import { Comment } from '../Comment/Comment';
import { Loader } from '../Skeleton/Skeleton';
import "./post.scss";

export default function Post() {
  const post = useAppSelector(state => state.posts.post);
  const comments = useAppSelector(state => state.comments.list);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadPost();
    loadComments();
  }, [])

  const loadPost = () => {
    dispatch(getPost(String(id)));
  }

  const loadComments = () => {
    dispatch(fetchComments(String(id)));
  }

  return (
    <div>
      {!post && <Loader />}

      <div>
        <Link to="/posts"><p style={{ fontSize: "large" }}>&#8592; Back</p></Link>
        <div className='postInfo'>
          <h1>{post?.title}</h1>
          <p>{post?.body}</p>
        </div>

        <div className='postComments'>
          {comments.map((comment) => (
            <Comment {...comment} />
          ))}
        </div>
      </div>
    </div>
  )
}
