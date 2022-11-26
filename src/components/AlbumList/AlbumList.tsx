import React from 'react'
import { useAppSelector } from '../../app/hooks'
import AlbumSlider from '../Album/AlbumSlider';
import AlbumItem from '../AlbumItem/AlbumItem';

export default function AlbumList() {
  const albums = useAppSelector(state => state.albums.list);

  return (
    <div>
      <h2>Album List</h2>
      {albums.map((album) => (
        <AlbumItem
          key={album.id}
          {...album}
        />
      ))}
    </div>
  )
}
