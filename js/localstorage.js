// ============================================
// 📦 STORAGE MANAGER v2.0
// Manajemen Data dengan LocalStorage
// Fitur: CRUD, Backup, Restore, Export, Import
// ============================================

class StorageManager {
    constructor() {
        // Database schema
        this.DB_NAME = 'kelas12a_db';
        this.VERSION = '2.0.0';
        
        // Collection names
        this.COLLECTIONS = {
            MEMBERS: 'members',
            PHOTOS: 'photos',
            SETTINGS: 'settings',
            ANNOUNCEMENTS: 'announcements',
            ACTIVITIES: 'activities'
        };
        
        // Initialize database
        this.init();
    }
    
    // ============================================
    // 🚀 INITIALIZATION
    // ============================================
    
    init() {
        this.createCollections();
        this.loadDefaultData();
        console.log(`✅ Storage Manager v${this.VERSION} initialized`);
    }
    
    createCollections() {
        Object.values(this.COLLECTIONS).forEach(collection => {
            if (!localStorage.getItem(`${this.DB_NAME}_${collection}`)) {
                localStorage.setItem(`${this.DB_NAME}_${collection}`, JSON.stringify([]));
            }
        });
    }
    
    loadDefaultData() {
        // Load default members if empty
        if (this.getCollection(this.COLLECTIONS.MEMBERS).length === 0) {
            this.loadDefaultMembers();
        }
        
        // Load default photos if empty
        if (this.getCollection(this.COLLECTIONS.PHOTOS).length === 0) {
            this.loadDefaultPhotos();
        }
        
        // Load default settings if empty
        if (Object.keys(this.getCollection(this.COLLECTIONS.SETTINGS)).length === 0) {
            this.loadDefaultSettings();
        }
        
        // Load default announcements if empty
        if (this.getCollection(this.COLLECTIONS.ANNOUNCEMENTS).length === 0) {
            this.loadDefaultAnnouncements();
        }
        
        // Load default activities if empty
        if (this.getCollection(this.COLLECTIONS.ACTIVITIES).length === 0) {
            this.loadDefaultActivities();
        }
    }
    
    // ============================================
    // 📚 DEFAULT DATA (dengan No Absen)
    // ============================================
    
    loadDefaultMembers() {
        const defaultMembers = [
            {
                id: this.generateId(),
                noAbsen: "01",
                name: "Ahmad Fauzi",
                gender: "Laki-laki",
                role: "Ketua Kelas",
                photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Ahmad+Fauzi&size=128",
                email: "ahmad.fauzi@kelas12a.sch.id",
                phone: "0812-3456-7890",
                address: "Jl. Merdeka No. 1, Jakarta",
                birthDate: "2006-01-15",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "02",
                name: "Siti Aisyah",
                gender: "Perempuan",
                role: "Wakil Ketua",
                photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=Siti+Aisyah&size=128",
                email: "siti.aisyah@kelas12a.sch.id",
                phone: "0812-3456-7891",
                address: "Jl. Sudirman No. 2, Jakarta",
                birthDate: "2006-02-20",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "03",
                name: "Budi Santoso",
                gender: "Laki-laki",
                role: "Sekretaris",
                photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Budi+Santoso&size=128",
                email: "budi.santoso@kelas12a.sch.id",
                phone: "0812-3456-7892",
                address: "Jl. Thamrin No. 3, Jakarta",
                birthDate: "2006-03-10",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "04",
                name: "Dewi Lestari",
                gender: "Perempuan",
                role: "Bendahara",
                photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=Dewi+Lestari&size=128",
                email: "dewi.lestari@kelas12a.sch.id",
                phone: "0812-3456-7893",
                address: "Jl. Gatot Subroto No. 4, Jakarta",
                birthDate: "2006-04-25",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "05",
                name: "Rizky Ramadhan",
                gender: "Laki-laki",
                role: "Anggota",
                photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Rizky+Ramadhan&size=128",
                email: "rizky.ramadhan@kelas12a.sch.id",
                phone: "0812-3456-7894",
                address: "Jl. Kuningan No. 5, Jakarta",
                birthDate: "2006-05-12",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "06",
                name: "Nurul Hidayah",
                gender: "Perempuan",
                role: "Anggota",
                photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=Nurul+Hidayah&size=128",
                email: "nurul.hidayah@kelas12a.sch.id",
                phone: "0812-3456-7895",
                address: "Jl. Rasuna Said No. 6, Jakarta",
                birthDate: "2006-06-18",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "07",
                name: "Dimas Prasetyo",
                gender: "Laki-laki",
                role: "Anggota",
                photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Dimas+Prasetyo&size=128",
                email: "dimas.prasetyo@kelas12a.sch.id",
                phone: "0812-3456-7896",
                address: "Jl. Diponegoro No. 7, Jakarta",
                birthDate: "2006-07-22",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "08",
                name: "Putri Maharani",
                gender: "Perempuan",
                role: "Anggota",
                photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=Putri+Maharani&size=128",
                email: "putri.maharani@kelas12a.sch.id",
                phone: "0812-3456-7897",
                address: "Jl. Pahlawan No. 8, Jakarta",
                birthDate: "2006-08-30",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "09",
                name: "Eko Saputra",
                gender: "Laki-laki",
                role: "Anggota",
                photo: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Eko+Saputra&size=128",
                email: "eko.saputra@kelas12a.sch.id",
                phone: "0812-3456-7898",
                address: "Jl. Veteran No. 9, Jakarta",
                birthDate: "2006-09-14",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                noAbsen: "10",
                name: "Rina Anggraeni",
                gender: "Perempuan",
                role: "Anggota",
                photo: "https://ui-avatars.com/api/?background=ec489a&color=fff&name=Rina+Anggraeni&size=128",
                email: "rina.anggraeni@kelas12a.sch.id",
                phone: "0812-3456-7899",
                address: "Jl. Sisingamangaraja No. 10, Jakarta",
                birthDate: "2006-10-05",
                joinDate: "2024-07-01",
                status: "active",
                createdAt: new Date().toISOString()
            }
        ];
        
        this.setCollection(this.COLLECTIONS.MEMBERS, defaultMembers);
    }
    
    loadDefaultPhotos() {
        const defaultPhotos = [
            {
                id: this.generateId(),
                title: "Upacara Bendera 17 Agustus",
                category: "event",
                description: "Kegiatan upacara bendera dalam rangka HUT RI ke-79",
                image: "https://picsum.photos/id/20/400/300",
                date: new Date().toISOString(),
                uploadedBy: "Admin",
                views: 0
            },
            {
                id: this.generateId(),
                title: "Belajar Kelompok Matematika",
                category: "academic",
                description: "Sesi belajar bersama membahas soal Ujian",
                image: "https://picsum.photos/id/21/400/300",
                date: new Date().toISOString(),
                uploadedBy: "Admin",
                views: 0
            },
            {
                id: this.generateId(),
                title: "Study Tour ke TMII",
                category: "fun",
                description: "Kegiatan study tour bersama kelas 12A",
                image: "https://picsum.photos/id/22/400/300",
                date: new Date().toISOString(),
                uploadedBy: "Admin",
                views: 0
            },
            {
                id: this.generateId(),
                title: "Praktikum Kimia",
                category: "academic",
                description: "Praktikum di laboratorium kimia",
                image: "https://picsum.photos/id/23/400/300",
                date: new Date().toISOString(),
                uploadedBy: "Admin",
                views: 0
            },
            {
                id: this.generateId(),
                title: "Class Meeting",
                category: "event",
                description: "Kegiatan class meeting antar kelas",
                image: "https://picsum.photos/id/24/400/300",
                date: new Date().toISOString(),
                uploadedBy: "Admin",
                views: 0
            },
            {
                id: this.generateId(),
                title: "Wisuda Kelas 12",
                category: "event",
                description: "Acara perpisahan dan wisuda kelas 12",
                image: "https://picsum.photos/id/25/400/300",
                date: new Date().toISOString(),
                uploadedBy: "Admin",
                views: 0
            }
        ];
        
        this.setCollection(this.COLLECTIONS.PHOTOS, defaultPhotos);
    }
    
    loadDefaultSettings() {
        const defaultSettings = {
            className: "Kelas 12A",
            schoolName: "SMAN 1 Jakarta",
            schoolYear: "2024/2025",
            homeroomTeacher: "Budi Santoso, S.Pd",
            theme: "light",
            language: "id",
            announcement: "Selamat datang di website resmi Kelas 12A!",
            footerText: "© 2024 Kelas 12A - All rights reserved",
            contactEmail: "kelas12a@sekolah.sch.id",
            contactPhone: "+62 812-3456-7890"
        };
        
        this.setCollection(this.COLLECTIONS.SETTINGS, defaultSettings);
    }
    
    loadDefaultAnnouncements() {
        const defaultAnnouncements = [
            {
                id: this.generateId(),
                title: "Ujian Akhir Semester",
                content: "Ujian Akhir Semester akan dilaksanakan pada tanggal 15-20 Desember 2024. Persiapkan diri dengan baik!",
                date: new Date().toISOString(),
                priority: "high",
                isActive: true
            },
            {
                id: this.generateId(),
                title: "Libur Semester",
                content: "Libur semester akan dimulai tanggal 21 Desember 2024 - 5 Januari 2025",
                date: new Date().toISOString(),
                priority: "medium",
                isActive: true
            }
        ];
        
        this.setCollection(this.COLLECTIONS.ANNOUNCEMENTS, defaultAnnouncements);
    }
    
    loadDefaultActivities() {
        const defaultActivities = [
            {
                id: this.generateId(),
                action: "create",
                collection: "members",
                data: "Data awal diinisialisasi",
                user: "System",
                timestamp: new Date().toISOString()
            }
        ];
        
        this.setCollection(this.COLLECTIONS.ACTIVITIES, defaultActivities);
    }
    
    // ============================================
    // 🔧 HELPER FUNCTIONS
    // ============================================
    
    generateId() {
        return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }
    
    // Get collection
    getCollection(collectionName) {
        try {
            const data = localStorage.getItem(`${this.DB_NAME}_${collectionName}`);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error reading collection ${collectionName}:`, error);
            return [];
        }
    }
    
    // Set collection
    setCollection(collectionName, data) {
        try {
            localStorage.setItem(`${this.DB_NAME}_${collectionName}`, JSON.stringify(data));
        } catch (error) {
            console.error(`Error writing collection ${collectionName}:`, error);
            throw error;
        }
    }
    
    // ============================================
    // 📇 MEMBERS CRUD OPERATIONS
    // ============================================
    
    getAllMembers() {
        return this.getCollection(this.COLLECTIONS.MEMBERS);
    }
    
    getMemberById(id) {
        const members = this.getAllMembers();
        return members.find(member => member.id === id);
    }
    
    getMemberByNoAbsen(noAbsen) {
        const members = this.getAllMembers();
        return members.find(member => member.noAbsen === noAbsen);
    }
    
    addMember(memberData) {
        // Input validation
        if (!memberData.name || memberData.name.length < 2) throw new Error('Nama minimal 2 karakter');
        if (!memberData.noAbsen || !/^[0-9]{1,2}$/.test(memberData.noAbsen)) throw new Error('No Absen harus angka 1-99');
        if (!['Laki-laki', 'Perempuan'].includes(memberData.gender)) throw new Error('Jenis kelamin tidak valid');
        if (this.getMemberByNoAbsen(memberData.noAbsen)) throw new Error('No Absen sudah digunakan');
        
        const members = this.getAllMembers();
        const newMember = {
            id: this.generateId(),
            ...memberData,
            status: "active",
            createdAt: new Date().toISOString()
        };
        
        members.push(newMember);
        this.setCollection(this.COLLECTIONS.MEMBERS, members);
        this.addActivity('create', 'members', `Menambah anggota: ${memberData.name}`);
        
        return newMember;
    }
    
    updateMember(id, updatedData) {
        const members = this.getAllMembers();
        const index = members.findIndex(member => member.id === id);
        
        if (index !== -1) {
            members[index] = { ...members[index], ...updatedData };
            this.setCollection(this.COLLECTIONS.MEMBERS, members);
            this.addActivity('update', 'members', `Mengupdate anggota: ${members[index].name}`);
            return members[index];
        }
        
        return null;
    }
    
    deleteMember(id) {
        const members = this.getAllMembers();
        const deletedMember = members.find(member => member.id === id);
        const filteredMembers = members.filter(member => member.id !== id);
        
        this.setCollection(this.COLLECTIONS.MEMBERS, filteredMembers);
        this.addActivity('delete', 'members', `Menghapus anggota: ${deletedMember?.name}`);
        
        return deletedMember;
    }
    
    searchMembers(keyword) {
        const members = this.getAllMembers();
        const lowerKeyword = keyword.toLowerCase();
        
        return members.filter(member => 
            member.name.toLowerCase().includes(lowerKeyword) ||
            member.noAbsen.toLowerCase().includes(lowerKeyword) ||
            member.role.toLowerCase().includes(lowerKeyword)
        );
    }
    
    getMembersByGender(gender) {
        const members = this.getAllMembers();
        return members.filter(member => member.gender === gender);
    }
    
    getMembersByRole(role) {
        const members = this.getAllMembers();
        return members.filter(member => member.role === role);
    }
    
    getStatistikMembers() {
        const members = this.getAllMembers();
        const total = members.length;
        const lakiLaki = members.filter(m => m.gender === "Laki-laki").length;
        const perempuan = members.filter(m => m.gender === "Perempuan").length;
        const pengurus = members.filter(m => m.role !== "Anggota").length;
        
        return { total, lakiLaki, perempuan, pengurus };
    }
    
    // ============================================
    // 🖼️ PHOTOS CRUD OPERATIONS
    // ============================================
    
    getAllPhotos() {
        return this.getCollection(this.COLLECTIONS.PHOTOS);
    }
    
    getPhotoById(id) {
        const photos = this.getAllPhotos();
        return photos.find(photo => photo.id === id);
    }
    
    addPhoto(photoData) {
        const photos = this.getAllPhotos();
        const newPhoto = {
            id: this.generateId(),
            ...photoData,
            date: new Date().toISOString(),
            views: 0
        };
        
        photos.push(newPhoto);
        this.setCollection(this.COLLECTIONS.PHOTOS, photos);
        this.addActivity('create', 'photos', `Menambah foto: ${photoData.title}`);
        
        return newPhoto;
    }
    
    deletePhoto(id) {
        const photos = this.getAllPhotos();
        const deletedPhoto = photos.find(photo => photo.id === id);
        const filteredPhotos = photos.filter(photo => photo.id !== id);
        
        this.setCollection(this.COLLECTIONS.PHOTOS, filteredPhotos);
        this.addActivity('delete', 'photos', `Menghapus foto: ${deletedPhoto?.title}`);
        
        return deletedPhoto;
    }
    
    incrementPhotoView(id) {
        const photos = this.getAllPhotos();
        const index = photos.findIndex(photo => photo.id === id);
        
        if (index !== -1) {
            photos[index].views = (photos[index].views || 0) + 1;
            this.setCollection(this.COLLECTIONS.PHOTOS, photos);
        }
    }
    
    getPhotosByCategory(category) {
        const photos = this.getAllPhotos();
        return photos.filter(photo => photo.category === category);
    }
    
    getStatistikPhotos() {
        const photos = this.getAllPhotos();
        const total = photos.length;
        const academic = photos.filter(p => p.category === "academic").length;
        const event = photos.filter(p => p.category === "event").length;
        const fun = photos.filter(p => p.category === "fun").length;
        
        return { total, academic, event, fun };
    }
    
    // ============================================
    // ⚙️ SETTINGS OPERATIONS
    // ============================================
    
    getSettings() {
        return this.getCollection(this.COLLECTIONS.SETTINGS);
    }
    
    updateSettings(newSettings) {
        const currentSettings = this.getSettings();
        const updatedSettings = { ...currentSettings, ...newSettings };
        this.setCollection(this.COLLECTIONS.SETTINGS, updatedSettings);
        this.addActivity('update', 'settings', 'Mengupdate pengaturan website');
        
        return updatedSettings;
    }
    
    // ============================================
    // 📢 ANNOUNCEMENTS OPERATIONS
    // ============================================
    
    getAllAnnouncements() {
        return this.getCollection(this.COLLECTIONS.ANNOUNCEMENTS);
    }
    
    getActiveAnnouncements() {
        const announcements = this.getAllAnnouncements();
        return announcements.filter(a => a.isActive === true);
    }
    
    addAnnouncement(announcementData) {
        const announcements = this.getAllAnnouncements();
        const newAnnouncement = {
            id: this.generateId(),
            ...announcementData,
            date: new Date().toISOString(),
            isActive: true
        };
        
        announcements.push(newAnnouncement);
        this.setCollection(this.COLLECTIONS.ANNOUNCEMENTS, announcements);
        this.addActivity('create', 'announcements', `Menambah pengumuman: ${announcementData.title}`);
        
        return newAnnouncement;
    }
    
    deleteAnnouncement(id) {
        const announcements = this.getAllAnnouncements();
        const filteredAnnouncements = announcements.filter(a => a.id !== id);
        this.setCollection(this.COLLECTIONS.ANNOUNCEMENTS, filteredAnnouncements);
    }
    
    // ============================================
    // 📝 ACTIVITIES LOG
    // ============================================
    
    getAllActivities() {
        return this.getCollection(this.COLLECTIONS.ACTIVITIES);
    }
    
    addActivity(action, collection, description) {
        const activities = this.getAllActivities();
        const newActivity = {
            id: this.generateId(),
            action,
            collection,
            description,
            timestamp: new Date().toISOString()
        };
        
        activities.unshift(newActivity); // Add to beginning
        
        // Keep only last 100 activities
        if (activities.length > 100) {
            activities.pop();
        }
        
        this.setCollection(this.COLLECTIONS.ACTIVITIES, activities);
    }
    
    clearActivities() {
        this.setCollection(this.COLLECTIONS.ACTIVITIES, []);
        this.addActivity('clear', 'activities', 'Menghapus semua log aktivitas');
    }
    
    // ============================================
    // 💾 BACKUP & RESTORE
    // ============================================
    
    exportAllData() {
        const allData = {};
        
        Object.values(this.COLLECTIONS).forEach(collection => {
            allData[collection] = this.getCollection(collection);
        });
        
        allData._metadata = {
            exportDate: new Date().toISOString(),
            version: this.VERSION,
            dbName: this.DB_NAME
        };
        
        return allData;
    }
    
    importAllData(data) {
        try {
            Object.keys(data).forEach(collection => {
                if (Object.values(this.COLLECTIONS).includes(collection)) {
                    this.setCollection(collection, data[collection]);
                }
            });
            
            this.addActivity('import', 'all', 'Mengimpor data dari backup');
            return { success: true, message: 'Data berhasil diimpor!' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    downloadBackup() {
        const data = this.exportAllData();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kelas12a_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.addActivity('export', 'all', 'Mengekspor backup data');
    }
    
    resetAllData() {
        localStorage.clear();
        this.init();
        this.addActivity('reset', 'all', 'Meriset semua data ke default');
        return { success: true, message: 'Semua data telah direset!' };
    }
    
    // ============================================
    // 📊 DASHBOARD STATISTICS
    // ============================================
    
    getDashboardStats() {
        const members = this.getAllMembers();
        const photos = this.getAllPhotos();
        const announcements = this.getAllAnnouncements();
        const activities = this.getAllActivities();
        
        return {
            totalMembers: members.length,
            totalPhotos: photos.length,
            totalAnnouncements: announcements.length,
            totalActivities: activities.length,
            activeMembers: members.filter(m => m.status === 'active').length,
            photoByCategory: this.getStatistikPhotos(),
            memberByGender: this.getStatistikMembers(),
            latestActivities: activities.slice(0, 5)
        };
    }
}

// ============================================
// 🚀 EXPORT & INITIALIZE
// ============================================

// Create global instance
const storage = new StorageManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storage;
}