import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BsImage } from "react-icons/bs";
import { AlbumType } from '../../models/album.type';
import "./albumItem.scss";


export default function AlbumItem({ userId, id, title }: AlbumType) {
  return (
    <div className='albumItem'>

      <BsImage className="imgTemplate" size={140} color={"#1677FF"} />
      <p>{title}</p>

      <Link
        to={`/albums/${id}`}
      >
        <button>View</button>
      </Link>
    </div>
  )
}

