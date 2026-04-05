import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MemberCard from '../components/MemberCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { storage } from '../services/storage';
import { Member } from '../types';

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      await storage.init();
      const data = storage.getMembers();
      setMembers(data);
      setFilteredMembers(data);
      setLoading(false);
    };
    loadMembers();
  }, []);

  useEffect(() => {
    let filtered = members;
    
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.noAbsen.includes(searchTerm)
      );
    }
    
    if (activeFilter === 'Laki-laki') {
      filtered = filtered.filter(m => m.gender === 'Laki-laki');
    } else if (activeFilter === 'Perempuan') {
      filtered = filtered.filter(m => m.gender === 'Perempuan');
    } else if (activeFilter === 'pengurus') {
      filtered = filtered.filter(m => m.role !== 'Anggota');
    }
    
    setFilteredMembers(filtered);
  }, [searchTerm, activeFilter, members]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container">
          <h1>Anggota Kelas</h1>
          <p>Siswa-siswi kelas 10 DKV 3</p>
        </div>
      </section>

      <section className="members section-padding">
        <div className="container">
          <div className="filter-section">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Cari nama atau no absen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              {['all', 'Laki-laki', 'Perempuan', 'pengurus'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'all' ? 'Semua' : filter === 'pengurus' ? 'Pengurus' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="members-grid">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Tidak ada anggota ditemukan</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Members;