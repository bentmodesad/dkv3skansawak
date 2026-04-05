// ============================================
// STORAGE MANAGER - 10 DKV 3
// Manajemen Data dengan LocalStorage
// ============================================

class StorageManager {
    constructor() {
        this.DB_NAME = 'dkv3_local';
        this.init();
    }

    init() {
        this.createCollections();
        this.loadDefaultData();
        console.log('✅ Storage Manager initialized');
    }

    createCollections() {
        if (!localStorage.getItem(this.DB_NAME + '_members')) {
            localStorage.setItem(this.DB_NAME + '_members', JSON.stringify([]));
        }
        if (!localStorage.getItem(this.DB_NAME + '_photos')) {
            localStorage.setItem(this.DB_NAME + '_photos', JSON.stringify([]));
        }
        if (!localStorage.getItem(this.DB_NAME + '_settings')) {
            localStorage.setItem(this.DB_NAME + '_settings', JSON.stringify({}));
        }
        if (!localStorage.getItem(this.DB_NAME + '_chat')) {
            localStorage.setItem(this.DB_NAME + '_chat', JSON.stringify([]));
        }
        if (!localStorage.getItem(this.DB_NAME + '_forum')) {
            localStorage.setItem(this.DB_NAME + '_forum', JSON.stringify([]));
        }
    }

    loadDefaultData() {
        this.loadDefaultMembers();
        this.loadDefaultPhotos();
        this.loadDefaultSettings();
    }

    // ========== DEFAULT ANGGOTA (SESUAI DAFTAR) ==========
    loadDefaultMembers() {
        const members = this.getMembers();
        if (members.length === 0) {
            const defaultMembers = [
                {
                    id: this.generateId(),
                    noAbsen: "01",
                    name: "Indra Yulianti",
                    gender: "Perempuan",
                    role: "Ketua Kelas",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=Indra+Yulianti&size=128",
                    nim: "DKV001",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "02",
                    name: "ROBBY KRISNAWAN",
                    gender: "Laki-laki",
                    role: "Wakil Ketua",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=ROBBY+KRISNAWAN&size=128",
                    nim: "DKV002",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "03",
                    name: "MELINA SEPTIAN ELSANTI",
                    gender: "Perempuan",
                    role: "Sekretaris",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=MELINA+SEPTIAN+ELSANTI&size=128",
                    nim: "DKV003",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "04",
                    name: "BELLA",
                    gender: "Perempuan",
                    role: "Bendahara",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=BELLA&size=128",
                    nim: "DKV004",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "05",
                    name: "AULINE SEVANI KRINISTIA",
                    gender: "Perempuan",
                    role: "Seksi Kebersihan",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=AULINE+SEVANI+KRINISTIA&size=128",
                    nim: "DKV005",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "06",
                    name: "ELROY BOAS KRINAMURTI",
                    gender: "Laki-laki",
                    role: "Seksi Upacara",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=ELROY+BOAS+KRINAMURTI&size=128",
                    nim: "DKV006",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "07",
                    name: "FRENDY ARI PRATAMA",
                    gender: "Laki-laki",
                    role: "Seksi Keamanan",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=FRENDY+ARI+PRATAMA&size=128",
                    nim: "DKV007",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "08",
                    name: "DIRGAHINTA ELLOKNUSA HAJENDA PULUNG",
                    gender: "Laki-laki",
                    role: "Seksi Agama Islam",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=DIRGAHINTA+ELLOKNUSA&size=128",
                    nim: "DKV008",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "09",
                    name: "ALFINA DWI KRISTIANA",
                    gender: "Perempuan",
                    role: "Seksi Agama Kristen",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=ALFINA+DWI+KRISTIANA&size=128",
                    nim: "DKV009",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "10",
                    name: "REVAN NOVERIO",
                    gender: "Laki-laki",
                    role: "Seksi Olahraga",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=REVAN+NOVERIO&size=128",
                    nim: "DKV010",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "11",
                    name: "REVALIA KRISTIANA",
                    gender: "Perempuan",
                    role: "Anggota",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=REVALIA+KRISTIANA&size=128",
                    nim: "DKV011",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "12",
                    name: "NOVITA CINTA PERMATA DEWI",
                    gender: "Perempuan",
                    role: "Anggota",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=NOVITA+CINTA+PERMATA+DEWI&size=128",
                    nim: "DKV012",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "13",
                    name: "RINDANI WULAN SARI",
                    gender: "Perempuan",
                    role: "Anggota",
                    photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=RINDANI+WULAN+SARI&size=128",
                    nim: "DKV013",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "14",
                    name: "KRISTYAN ANUGRAH HERI SETIAWAN",
                    gender: "Laki-laki",
                    role: "Seksi Keamanan",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=KRISTYAN+ANUGRAH&size=128",
                    nim: "DKV014",
                    status: "active",
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    noAbsen: "15",
                    name: "Farand Aditya Nugroho",
                    gender: "Laki-laki",
                    role: "Anggota",
                    photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Farand+Aditya+Nugroho&size=128",
                    nim: "DKV015",
                    status: "active",
                    createdAt: new Date().toISOString()
                }
            ];
            this.setMembers(defaultMembers);
            console.log('Default members loaded:', defaultMembers.length);
        }
    }

    loadDefaultPhotos() {
        const photos = this.getPhotos();
        if (photos.length === 0) {
            const defaultPhotos = [
                {
                    id: this.generateId(),
                    title: "Foto Bersama Kelas",
                    category: "fun",
                    description: "Momen kebersamaan kelas 10 DKV 3",
                    image: "https://placehold.co/600x400/4f46e5/white?text=Foto+Bersama+DKV+3",
                    date: new Date().toISOString(),
                    views: 0
                }
            ];
            this.setPhotos(defaultPhotos);
            console.log('Default photos loaded');
        }
    }

    loadDefaultSettings() {
        const settings = this.getSettings();
        if (Object.keys(settings).length === 0) {
            const defaultSettings = {
                className: "10 DKV 3",
                schoolName: "SMK Negeri 1 Cluwak",
                schoolYear: "2024/2025",
                homeroomTeacher: "Budi Santoso, S.Pd",
                announcement: "Selamat datang di website resmi kelas 10 DKV 3 SMK Negeri 1 Cluwak!",
                contactEmail: "dkv3@smkn1cluwak.sch.id",
                contactPhone: "+62 812-3456-7890",
                address: "SMK Negeri 1 Cluwak, Pati, Jawa Tengah"
            };
            this.setSettings(defaultSettings);
            console.log('Default settings loaded');
        }
    }

    // ========== HELPER ==========
    generateId() {
        return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // ========== MEMBERS ==========
    getMembers() {
        try {
            const data = localStorage.getItem(this.DB_NAME + '_members');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting members:', error);
            return [];
        }
    }

    setMembers(members) {
        localStorage.setItem(this.DB_NAME + '_members', JSON.stringify(members));
    }

    addMember(memberData) {
        try {
            const members = this.getMembers();
            const newMember = {
                id: this.generateId(),
                ...memberData,
                status: "active",
                createdAt: new Date().toISOString()
            };
            members.push(newMember);
            this.setMembers(members);
            console.log('✅ Member added:', newMember.name);
            return newMember;
        } catch (error) {
            console.error('Error adding member:', error);
            return null;
        }
    }

    updateMember(id, updatedData) {
        try {
            const members = this.getMembers();
            const index = members.findIndex(m => m.id === id);
            if (index !== -1) {
                members[index] = { ...members[index], ...updatedData };
                this.setMembers(members);
                console.log('✅ Member updated:', members[index].name);
                return members[index];
            }
            return null;
        } catch (error) {
            console.error('Error updating member:', error);
            return null;
        }
    }

    deleteMember(id) {
        try {
            const members = this.getMembers();
            const filtered = members.filter(m => m.id !== id);
            this.setMembers(filtered);
            console.log('✅ Member deleted:', id);
            return true;
        } catch (error) {
            console.error('Error deleting member:', error);
            return false;
        }
    }

    getMemberById(id) {
        const members = this.getMembers();
        return members.find(m => m.id === id) || null;
    }

    getMemberByNoAbsen(noAbsen) {
        const members = this.getMembers();
        return members.find(m => m.noAbsen === noAbsen) || null;
    }

    searchMembers(keyword) {
        const members = this.getMembers();
        const lowerKeyword = keyword.toLowerCase();
        return members.filter(m => 
            m.name.toLowerCase().includes(lowerKeyword) ||
            m.noAbsen.includes(lowerKeyword) ||
            (m.role && m.role.toLowerCase().includes(lowerKeyword))
        );
    }

    // ========== PHOTOS ==========
    getPhotos() {
        try {
            const data = localStorage.getItem(this.DB_NAME + '_photos');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting photos:', error);
            return [];
        }
    }

    setPhotos(photos) {
        localStorage.setItem(this.DB_NAME + '_photos', JSON.stringify(photos));
    }

    addPhoto(photoData) {
        try {
            const photos = this.getPhotos();
            const newPhoto = {
                id: this.generateId(),
                title: photoData.title || "Untitled",
                category: photoData.category || "event",
                description: photoData.description || "",
                image: photoData.image || "https://placehold.co/600x400/4f46e5/white?text=No+Image",
                date: new Date().toISOString(),
                views: 0
            };
            photos.push(newPhoto);
            this.setPhotos(photos);
            console.log('✅ Photo added:', newPhoto.title);
            return newPhoto;
        } catch (error) {
            console.error('Error adding photo:', error);
            return null;
        }
    }

    deletePhoto(id) {
        try {
            const photos = this.getPhotos();
            const filtered = photos.filter(p => p.id !== id);
            this.setPhotos(filtered);
            console.log('✅ Photo deleted:', id);
            return true;
        } catch (error) {
            console.error('Error deleting photo:', error);
            return false;
        }
    }

    getPhotosByCategory(category) {
        const photos = this.getPhotos();
        if (category === 'all') return photos;
        return photos.filter(p => p.category === category);
    }

    // ========== SETTINGS ==========
    getSettings() {
        try {
            const data = localStorage.getItem(this.DB_NAME + '_settings');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error getting settings:', error);
            return {};
        }
    }

    setSettings(settings) {
        localStorage.setItem(this.DB_NAME + '_settings', JSON.stringify(settings));
    }

    updateSettings(newSettings) {
        try {
            const current = this.getSettings();
            const updated = { ...current, ...newSettings, lastUpdated: new Date().toISOString() };
            this.setSettings(updated);
            console.log('✅ Settings updated');
            return updated;
        } catch (error) {
            console.error('Error updating settings:', error);
            return null;
        }
    }

    // ========== CHAT ==========
    getChat() {
        try {
            const data = localStorage.getItem(this.DB_NAME + '_chat');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            return [];
        }
    }

    setChat(chat) {
        localStorage.setItem(this.DB_NAME + '_chat', JSON.stringify(chat));
    }

    addMessage(msg) {
        const chat = this.getChat();
        chat.push({ id: this.generateId(), ...msg, time: new Date().toISOString() });
        this.setChat(chat);
        return msg;
    }

    // ========== FORUM ==========
    getForum() {
        try {
            const data = localStorage.getItem(this.DB_NAME + '_forum');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            return [];
        }
    }

    setForum(forum) {
        localStorage.setItem(this.DB_NAME + '_forum', JSON.stringify(forum));
    }

    addTopic(topic) {
        const forum = this.getForum();
        forum.push({ id: this.generateId(), ...topic, date: new Date().toISOString(), replies: [] });
        this.setForum(forum);
        return topic;
    }

    addReply(topicId, reply) {
        const forum = this.getForum();
        const topic = forum.find(t => t.id === topicId);
        if (topic) {
            topic.replies.push({ id: this.generateId(), ...reply, date: new Date().toISOString() });
            this.setForum(forum);
        }
    }

    // ========== STATISTICS ==========
    getStats() {
        const members = this.getMembers();
        const photos = this.getPhotos();
        return {
            totalMembers: members.length,
            totalPhotos: photos.length,
            maleCount: members.filter(m => m.gender === 'Laki-laki').length,
            femaleCount: members.filter(m => m.gender === 'Perempuan').length,
            officerCount: members.filter(m => m.role !== 'Anggota').length
        };
    }

    // ========== RESET ==========
    resetAll() {
        localStorage.removeItem(this.DB_NAME + '_members');
        localStorage.removeItem(this.DB_NAME + '_photos');
        localStorage.removeItem(this.DB_NAME + '_settings');
        localStorage.removeItem(this.DB_NAME + '_chat');
        localStorage.removeItem(this.DB_NAME + '_forum');
        this.init();
        console.log('✅ All data reset to default');
    }
}

// ========== CREATE GLOBAL INSTANCE ==========
const storage = new StorageManager();
console.log('Storage Manager loaded with', storage.getMembers().length, 'default members');