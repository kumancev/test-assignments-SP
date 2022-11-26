import React from 'react'
import "./homePage.scss"

export default function HomePage() {
  return (
    <div className='homePage'>
      <h1>Hello, <span style={{ color: "#1677ff" }}>Admin</span></h1>
      <h4>Here is your API interaction list</h4>
      <ol className="gradient-list">
        <li><span style={{ fontSize: "1.2em", fontWeight: "bold" }}>Post List</span>
          <ul className="nestedList">
            <li>Create new Post</li>
            <li>Read Post and Comments</li>
            <li>Update Post</li>
            <li>Delete Post</li>
          </ul>
        </li>
        <li><span style={{ fontSize: "1.2em", fontWeight: "bold" }}>Album List</span>
          <ul className="nestedList">
            <li>View photo Album</li>
          </ul>
        </li>
        <li><span style={{ fontSize: "1.2em", fontWeight: "bold" }}>Todos</span>
          <ul className="nestedList">
            <li>View Todos</li>
            <li>Change task status (dragNdrop)</li>
          </ul>
        </li>
      </ol>
    </div>
  )
}
