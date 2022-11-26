import React from 'react'
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../app/hooks'
import { deletePost } from '../../features/posts/postsSlice';
import { PostType } from '../../models/post.type';
import "./postItem.scss";

export default function PostItem({ userId, id, title, body }: PostType) {
  const dispatch = useAppDispatch();

  return (
    <div className="postItem">
      <div className="postActions">

        <Link
          to={`/updatePost/${id}`}>
          Edit
        </Link>
        <button
          className="postDelete"
          onClick={() => {
            const verificar = window.confirm("Are you sure you want to delete this post?");
            if (!verificar) return
            dispatch(deletePost(id))
          }}
        >
          &#9587;
        </button>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <Link to={`/posts/${id}`} className="btn btn-primary">
        <button className='readBtn'>Read more</button>
      </Link>
    </div>
  )
}
