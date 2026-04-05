import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { Member, Photo } from '../types';
import MemberCard from '../components/MemberCard';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('members');
  const [members, setMembers] = useState<Member[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

  // Form states
  const [newMember, setNewMember] = useState({ name: '', noAbsen: '', gender: 'Laki-laki', role: 'Anggota', photo: '' });
  const [newPhoto, setNewPhoto] = useState({ title: '', category: 'event', description: '', image: '' });
  const [settings, setSettings] = useState({ className: '', schoolName: '', announcement: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await storage.init();
    setMembers(storage.getMembers());
    setPhotos(storage.getPhotos());
    setSettings(storage.getSettings());
  };

  const showAlert = (message: string, type: string) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.noAbsen) {
      showAlert('Nama dan No Absen harus diisi!', 'error');
      return;
    }

    const photo = newMember.photo || `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(newMember.name)}`;
    const member = await storage.addMember({ ...newMember, photo });
    setMembers([...members, member]);
    setNewMember({ name: '', noAbsen: '', gender: 'Laki-laki', role: 'Anggota', photo: '' });
    showAlert('Anggota berhasil ditambahkan!', 'success');
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm('Yakin ingin menghapus anggota ini?')) {
      await storage.deleteMember(id);
      setMembers(members.filter(m => m.id !== id));
      showAlert('Anggota berhasil dihapus!', 'success');
    }
  };

  const handleEditMember = (member: Member) => {
    const newName = prompt('Edit Nama:', member.name);
    const newRole = prompt('Edit Jabatan:', member.role);
    if (newName && newRole) {
      storage.updateMember(member.id, { name: newName, role: newRole });
      loadData();
      showAlert('Anggota berhasil diupdate!', 'success');
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.image) {
      showAlert('Judul dan foto harus diisi!', 'error');
      return;
    }

    const photo = await storage.addPhoto(newPhoto);
    setPhotos([...photos, photo]);
    setNewPhoto({ title: '', category: 'event', description: '', image: '' });
    showAlert('Foto berhasil diupload!', 'success');
  };

  const handleDeletePhoto = async (id: string) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      await storage.deletePhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
      showAlert('Foto berhasil dihapus!', 'success');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMember: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isMember) {
          setNewMember({ ...newMember, photo: event.target?.result as string });
        } else {
          setNewPhoto({ ...newPhoto, image: event.target?.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await storage.updateSettings(settings);
    showAlert('Pengaturan berhasil disimpan!', 'success');
  };

  const handleResetAll = async () => {
    if (confirm('PERINGATAN: Ini akan menghapus SEMUA data! Yakin?')) {
      await storage.resetAll();
      await loadData();
      showAlert('Semua data telah direset!', 'success');
    }
  };

  const handleBackup = () => {
    const data = {
      members: storage.getMembers(),
      photos: storage.getPhotos(),
      settings: storage.getSettings()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dkv3_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAlert('Backup berhasil diunduh!', 'success');
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Admin Panel - 10 DKV 3</h1>
          <button onClick={logout} className="btn-danger" style={{ padding: '10px 20px' }}>Logout</button>
        </div>

        {alert && (
          <div className={`alert ${alert.type}`}>
            {alert.message}
          </div>
        )}

        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'members' ? 'active' : ''}`} onClick={() => setActiveTab('members')}>
            <i className="fas fa-users"></i> Kelola Anggota
          </button>
          <button className={`admin-tab ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>
            <i className="fas fa-images"></i> Kelola Foto
          </button>
          <button className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <i className="fas fa-cog"></i> Pengaturan
          </button>
        </div>

        {activeTab === 'members' && (
          <div className="admin-section">
            <h2>Tambah Anggota</h2>
            <form onSubmit={handleAddMember}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nama</label>
                  <input type="text" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>No Absen</label>
                  <input type="text" value={newMember.noAbsen} onChange={(e) => setNewMember({ ...newMember, noAbsen: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Jenis Kelamin</label>
                  <select value={newMember.gender} onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Jabatan</label>
                  <select value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}>
                    <option>Anggota</option>
                    <option>Ketua Kelas</option>
                    <option>Wakil Ketua</option>
                    <option>Sekretaris</option>
                    <option>Bendahara</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Foto</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                {newMember.photo && <img src={newMember.photo} alt="Preview" style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }} />}
              </div>
              <button type="submit" className="btn-submit">Tambah Anggota</button>
            </form>

            <hr style={{ margin: '30px 0' }} />

            <h2>Daftar Anggota</h2>
            <div className="members-grid">
              {members.map(member => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                  isAdmin={true}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="admin-section">
            <h2>Upload Foto</h2>
            <form onSubmit={handleAddPhoto}>
              <div className="form-row">
                <div className="form-group">
                  <label>Judul</label>
                  <input type="text" value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select value={newPhoto.category} onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}>
                    <option value="academic">Akademik</option>
                    <option value="event">Kegiatan</option>
                    <option value="fun">Kebersamaan</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea value={newPhoto.description} onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })} rows={3}></textarea>
              </div>
              <div className="form-group">
                <label>Foto</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} required />
                {newPhoto.image && <img src={newPhoto.image} alt="Preview" style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }} />}
              </div>
              <button type="submit" className="btn-submit">Upload Foto</button>
            </form>

            <hr style={{ margin: '30px 0' }} />

            <h2>Daftar Foto</h2>
            <div className="album-grid">
              {photos.map(photo => (
                <div key={photo.id} className="album-card" style={{ position: 'relative' }}>
                  <img src={photo.image} alt={photo.title} />
                  <div className="album-overlay">
                    <h3>{photo.title}</h3>
                    <p>{photo.category}</p>
                  </div>
                  <button
                    className="btn-danger"
                    onClick={() => handleDeletePhoto(photo.id)}
                    style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-section">
            <h2>Pengaturan Website</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label>Pengumuman</label>
                <textarea value={settings.announcement} onChange={(e) => setSettings({ ...settings, announcement: e.target.value })} rows={3}></textarea>
              </div>
              <div className="form-group">
                <label>Nama Kelas</label>
                <input type="text" value={settings.className} onChange={(e) => setSettings({ ...settings, className: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Sekolah</label>
                <input type="text" value={settings.schoolName} onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit">Simpan Pengaturan</button>
            </form>

            <hr style={{ margin: '30px 0' }} />

            <h2>Backup & Reset</h2>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={handleBackup} className="btn-submit" style={{ background: '#10b981' }}>
                <i className="fas fa-download"></i> Backup Data
              </button>
              <button onClick={handleResetAll} className="btn-submit" style={{ background: '#ef4444' }}>
                <i className="fas fa-trash"></i> Reset Semua Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;