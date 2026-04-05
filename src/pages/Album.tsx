import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AlbumCard from '../components/AlbumCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { storage } from '../services/storage';
import { Photo } from '../types';

const Album: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      await storage.init();
      const data = storage.getPhotos();
      setPhotos(data);
      setFilteredPhotos(data);
      setLoading(false);
    };
    loadPhotos();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, photos]);

  const openLightbox = (photo: Photo) => {
    setCurrentPhoto(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentPhoto(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container">
          <h1>Album Kelas</h1>
          <p>Dokumentasi kegiatan kelas 10 DKV 3</p>
        </div>
      </section>

      <section className="album section-padding">
        <div className="container">
          <div className="album-categories">
            {['all', 'academic', 'event', 'fun'].map(cat => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? 'Semua' : cat === 'academic' ? 'Akademik' : cat === 'event' ? 'Kegiatan' : 'Kebersamaan'}
              </button>
            ))}
          </div>

          <div className="album-grid">
            {filteredPhotos.map(photo => (
              <AlbumCard key={photo.id} photo={photo} onClick={openLightbox} />
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Belum ada foto</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentPhoto && (
        <div className="lightbox-modal active" onClick={closeLightbox}>
          <span className="close-lightbox" onClick={closeLightbox}>&times;</span>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentPhoto.image} alt={currentPhoto.title} />
            <div className="lightbox-caption">
              <strong>{currentPhoto.title}</strong><br />
              {currentPhoto.description}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Album;