import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import AlbumList from '../../components/AlbumList/AlbumList';
import { Spinner } from '../../components/Skeleton/Skeleton';
import { fetchAlbums } from '../../features/albums/albumsSlice';

export default function AlbumsPage() {
  const { loading, error } = useAppSelector(state => state.albums);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);


  return (
    <>
      {loading ? <Spinner /> : <AlbumList />}
      {error && <p>An error occured: {error}</p>}
    </>
  )
}
