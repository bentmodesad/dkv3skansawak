import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>10 DKV 3</h3>
            <p>Website resmi Kelas 10 DKV 3</p>
          </div>
          <div className="footer-section">
            <h4>Menu</h4>
            <ul>
              <li><a href="/">Beranda</a></li>
              <li><a href="/anggota">Anggota</a></li>
              <li><a href="/album">Album</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Kontak</h4>
            <ul>
              <li><i className="fas fa-envelope"></i> dkv3@sekolah.sch.id</li>
              <li><i className="fas fa-phone"></i> +62 812-3456-7890</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Kelas 10 DKV 3 - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;