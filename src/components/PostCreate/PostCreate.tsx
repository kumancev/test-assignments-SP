import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createPost } from '../../features/posts/postsSlice';
import "./postCreate.scss";

export default function PostCreate() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const new_post = {
      id: "0",
      title: title,
      body: body,
    };

    dispatch(createPost(new_post));
    navigate("/posts");
  };

  return (
    <div className="createItem">
      <h2>Add A Post</h2>
      <div>
        <form onSubmit={submitForm}>
          <div>
            <label>
              Title:
              <input
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
          <button>Add New Post</button>
        </form>
      </div>

      <Link to="/posts"><p>&#8592; Back</p></Link>
    </div>
  )
}
