import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { storage } from '../services/storage';

const Home: React.FC = () => {
  const [stats, setStats] = useState({ totalMembers: 0, totalPhotos: 0 });

  useEffect(() => {
    setStats(storage.getStats());
  }, []);

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-small">Selamat Datang di</span>
            Website Kelas 10 DKV 3
          </h1>
          <p className="hero-subtitle">Tempat inspirasi, kreativitas, dan kebersamaan</p>
          <div className="hero-buttons">
            <a href="/anggota" className="btn btn-primary"><i className="fas fa-users"></i> Anggota</a>
            <a href="/album" className="btn btn-outline"><i className="fas fa-images"></i> Album</a>
          </div>
        </div>
      </section>

      <section className="about section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tentang Kelas Kami</h2>
            <div className="section-divider"></div>
          </div>
          <div className="about-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <h3>Kelas 10 DKV 3 - <span className="highlight">Generasi Kreatif</span></h3>
              <p>Kelas 10 DKV 3 adalah kelas dengan semangat kreatif di bidang Desain Komunikasi Visual.</p>
              <div className="about-stats" style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
                <div className="stat-item">
                  <div className="stat-number" style={{ fontSize: '2rem', fontWeight: '700', color: '#4f46e5' }}>{stats.totalMembers}</div>
                  <div className="stat-label">Siswa</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" style={{ fontSize: '2rem', fontWeight: '700', color: '#4f46e5' }}>{stats.totalPhotos}</div>
                  <div className="stat-label">Foto</div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://placehold.co/600x400/4f46e5/ffffff?text=10+DKV+3" alt="Kelas 10 DKV 3" style={{ width: '100%', borderRadius: '16px' }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;