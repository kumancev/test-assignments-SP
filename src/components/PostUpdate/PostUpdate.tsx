import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPost, updatePost } from '../../features/posts/postsSlice';
import "./postUpdate.scss";

export default function PostUpdate() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.posts.post);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState("");

  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const loadPost = () => {
    dispatch(getPost(String(id!)));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const update_post = {
      id: post?.id as string,
      title: title,
      body: body,
    };

    dispatch(updatePost(update_post));
    navigate("/posts");
  };


  return (
    <div className="updateItem">
      <h2>Update A Post</h2>
      <div>
        <form onSubmit={submitForm}>
          <div>
            <label>
              Title:
              <input
                type="text"
                placeholder="Enter Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Body:
              <textarea
                placeholder="Enter Post Body Text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </label>
          </div>
          <button>Update Post</button>
        </form>
      </div>

      <Link to="/posts"><p>&#8592; Back</p></Link>
    </div>
  )
}
