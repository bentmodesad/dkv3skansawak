// Music Player - 10 DKV 3

// Daftar lagu (menggunakan URL audio dari internet)
const playlist = [
    {
        title: "Jakarta Hari Ini",
        artist: "10 DKV 3",
        url: "https://audio.jukehost.co.uk/7LqJ8nK9mP2xR4tY5uI6oP7aA8sD9fG0hH1j.mp3",
        duration: "3:45"
    },
    {
        title: "Mangu",
        artist: "10 DKV 3",
        url: "https://audio.jukehost.co.uk/8MrK0lN1oP3qR5sU6vJ7wW8xX9yZ0aB1cC2d.mp3",
        duration: "4:12"
    },
    {
        title: "Multo",
        artist: "10 DKV 3",
        url: "https://audio.jukehost.co.uk/9NsL1mO2pQ4rT6vW7xK8yL9zM0aN1bC2dD3e.mp3",
        duration: "3:58"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();
let currentVolume = 70;

// Inisialisasi audio
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.url;
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songArtist').textContent = song.artist;
    document.getElementById('duration').textContent = song.duration;
    
    // Update active playlist item
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update album art
    const albumArt = document.getElementById('albumArt');
    albumArt.innerHTML = `<i class="fas fa-music"></i>`;
    
    if (isPlaying) {
        audio.play();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Play/Pause
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Update progress bar
function updateProgress() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = `${progressPercent}%`;
        
        const currentMin = Math.floor(audio.currentTime / 60);
        const currentSec = Math.floor(audio.currentTime % 60);
        document.getElementById('currentTime').textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')}`;
    }
}

// Set progress on click
function setProgress(e) {
    const container = document.getElementById('progressContainer');
    const rect = container.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
}

// Set volume
function setVolume(value) {
    currentVolume = value;
    audio.volume = currentVolume / 100;
    document.getElementById('volumeSlider').value = currentVolume;
}

// Render playlist
function renderPlaylist() {
    const container = document.getElementById('playlist');
    container.innerHTML = playlist.map((song, index) => `
        <div class="playlist-item ${index === currentSongIndex ? 'active' : ''}" onclick="selectSong(${index})">
            <div class="playlist-number">${(index + 1).toString().padStart(2, '0')}</div>
            <div class="playlist-title-song">${song.title}</div>
            <div class="playlist-duration">${song.duration}</div>
        </div>
    `).join('');
}

function selectSong(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Auto play next when song ends
audio.addEventListener('ended', () => {
    nextSong();
});

audio.addEventListener('timeupdate', updateProgress);

// Event listeners
document.getElementById('playPauseBtn').addEventListener('click', togglePlay);
document.getElementById('nextBtn').addEventListener('click', nextSong);
document.getElementById('prevBtn').addEventListener('click', prevSong);
document.getElementById('progressContainer').addEventListener('click', setProgress);
document.getElementById('volumeSlider').addEventListener('input', (e) => setVolume(e.target.value));

// Load first song
renderPlaylist();
loadSong(0);
setVolume(70);

// Catatan: Karena lagu menggunakan URL demo, untuk lagu asli perlu upload file audio
// ke hosting atau gunakan file lokal di folder 'music/'
console.log('🎵 Music Player loaded. Untuk lagu asli, upload file .mp3 ke folder music/');