import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPhotos } from '../../features/photos/photosSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import "./albumSlider.scss";


export default function AlbumSlider() {
  const photos = useAppSelector(state => state.photos.list);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    dispatch(fetchPhotos(id!));
  }

  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const slideRight = () => {
    setIndex((index + 1) % photos.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(photos.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };


  return (
    photos.length > 0 ? (
      <div className='sliderWrap'>
        <h2>{photos[index].title}</h2>
        <div className='slider'>
          <span onClick={slideLeft} className="arrow"><IoIosArrowBack /></span>
          <img className='image' src={photos[index].url} alt={photos[index].title} />
          <span onClick={slideRight} className="arrow"><IoIosArrowForward /></span>
        </div>
        <Link to="/albums"><p style={{ fontSize: "large" }}>&#8592; Back</p></Link>
      </div>
    ) : (<><p>Not found photos...</p></>)
  );
}
