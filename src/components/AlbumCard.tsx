import React from 'react';
import { Photo } from '../types';

interface AlbumCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ photo, onClick }) => {
  return (
    <div className="album-card" onClick={() => onClick(photo)}>
      <img src={photo.image} alt={photo.title} />
      <div className="album-overlay">
        <h3>{photo.title}</h3>
        <p><i className="fas fa-calendar-alt"></i> {new Date(photo.date).toLocaleDateString('id-ID')}</p>
      </div>
    </div>
  );
};

export default AlbumCard;