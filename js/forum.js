// Forum Diskusi
let forumTopics = [];

function loadForum() {
    forumTopics = storage.getForum();
    renderForum();
}

function renderForum() {
    const container = document.getElementById('forumTopics');
    if (!container) return;
    
    if (forumTopics.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;"><i class="fas fa-comments"></i><p>Belum ada topik. Buat topik pertama!</p></div>';
        return;
    }
    
    container.innerHTML = forumTopics.map(topic => `
        <div class="forum-card" onclick="showTopic('${topic.id}')">
            <div class="forum-title">${topic.title}</div>
            <div class="forum-meta">Oleh ${topic.author} • ${new Date(topic.date).toLocaleDateString('id-ID')}</div>
            <div class="forum-preview">${topic.content.substring(0, 100)}${topic.content.length > 100 ? '...' : ''}</div>
            <div class="forum-stats"><i class="fas fa-reply"></i> ${topic.replies?.length || 0} balasan</div>
        </div>
    `).join('');
}

function showTopic(id) {
    const topic = forumTopics.find(t => t.id === id);
    if (!topic) return;
    
    let replyHtml = '';
    if (topic.replies && topic.replies.length > 0) {
        replyHtml = topic.replies.map(reply => `
            <div class="reply-item">
                <strong>${reply.author}</strong> <span style="color:#94a3b8; font-size:0.7rem;">${new Date(reply.date).toLocaleString('id-ID')}</span>
                <p>${reply.content}</p>
            </div>
        `).join('');
    }
    
    const modal = document.getElementById('topicModal');
    document.getElementById('modalTitle').textContent = topic.title;
    document.getElementById('modalAuthor').textContent = `Oleh ${topic.author} • ${new Date(topic.date).toLocaleString('id-ID')}`;
    document.getElementById('modalContent').innerHTML = `<p>${topic.content}</p>`;
    document.getElementById('modalReplies').innerHTML = replyHtml || '<p style="color:#94a3b8;">Belum ada balasan. Jadilah yang pertama!</p>';
    document.getElementById('currentTopicId').value = id;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('topicModal').style.display = 'none';
}

function addReply() {
    const content = document.getElementById('replyContent').value.trim();
    const topicId = document.getElementById('currentTopicId').value;
    if (!content) return;
    
    const author = localStorage.getItem('forumUsername') || 'Anonymous';
    storage.addReply(topicId, { author, content });
    loadForum();
    closeModal();
    document.getElementById('replyContent').value = '';
}

function createTopic() {
    const title = document.getElementById('newTitle').value.trim();
    const content = document.getElementById('newContent').value.trim();
    if (!title || !content) return;
    
    const author = localStorage.getItem('forumUsername') || 'Anonymous';
    storage.addTopic({ title, content, author });
    loadForum();
    document.getElementById('newTopicModal').style.display = 'none';
    document.getElementById('newTitle').value = '';
    document.getElementById('newContent').value = '';
}

function showNewTopicModal() {
    document.getElementById('newTopicModal').style.display = 'flex';
}

function closeNewTopicModal() {
    document.getElementById('newTopicModal').style.display = 'none';
}

function setForumUsername() {
    const name = prompt('Masukkan nama Anda untuk forum:', localStorage.getItem('forumUsername') || '');
    if (name) localStorage.setItem('forumUsername', name);
    document.getElementById('forumUser').textContent = localStorage.getItem('forumUsername') || 'Anonymous';
}

loadForum();