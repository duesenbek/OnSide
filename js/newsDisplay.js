// Функция отображения новостей на странице
function displayNews(newsArray) {
    const container = document.getElementById('news-container');
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error-message');
    
    // Скрыть индикатор загрузки
    if (loading) loading.style.display = 'none';
    
    // Проверка данных
    if (!newsArray || newsArray.length === 0) {
        if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Новости не найдены';
        }
        return;
    }
    
    // Скрыть сообщение об ошибке
    if (errorMsg) errorMsg.style.display = 'none';
    
    // Очистить контейнер
    container.innerHTML = '';
    
    // Создать карточки новостей
    newsArray.forEach(article => {
        const newsCard = createNewsCard(article);
        if (newsCard) container.appendChild(newsCard);
    });
}

// Функция создания карточки новости
function createNewsCard(article) {
    if (!article) return null;
    
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    const card = document.createElement('div');
    card.className = 'news-card card h-100';
    
    // Проверка наличия изображения
    const imageUrl = article.image || 'images/placeholder.jpg';
    
    // Форматирование даты
    const date = article.date ? new Date(article.date) : new Date();
    const dateStr = date.toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    card.innerHTML = `
        <div class="news-image card-img-top">
            <img src="${imageUrl}" 
                 class="card-img-top"
                 alt="${article.title || 'Новость'}"
                 onerror="this.src='images/placeholder.jpg'">
        </div>
        <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-primary">${article.source || 'News'}</span>
                <small class="text-muted">${dateStr}</small>
            </div>
            <h5 class="card-title">${article.title || 'Без названия'}</h5>
            ${article.description ? `<p class="card-text text-muted small">${article.description.substring(0, 120)}...</p>` : ''}
            <div class="mt-auto">
                <button class="btn btn-primary btn-sm w-100" onclick='viewNewsArticle(${JSON.stringify(article).replace(/'/g, "&apos;")})'>
                    Читать полностью
                </button>
            </div>
        </div>
    `;
    
    // Добавить клик на всю карточку
    card.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
            viewNewsArticle(article);
        }
    });
    
    col.appendChild(card);
    return col;
}

// Просмотр новости в модальном окне
function viewNewsArticle(article) {
    const modalHTML = `
        <div class="modal fade" id="newsModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${article.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <span class="badge bg-primary me-2">${article.source}</span>
                            <small class="text-muted">${new Date(article.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                        </div>
                        <img src="${article.image}" class="img-fluid rounded mb-3" alt="${article.title}" onerror="this.src='images/placeholder.jpg'">
                        <p class="lead">${article.description || ''}</p>
                        <hr>
                        <p>This is a demo article. In a real implementation, this would show the full article content from the news API.</p>
                        <p>Key highlights:</p>
                        <ul>
                            <li>Latest updates from ${article.source}</li>
                            <li>Published ${new Date(article.date).toLocaleDateString('ru-RU')}</li>
                            <li>Category: Football News</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read Original</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Удалить старое модальное окно если есть
    const oldModal = document.getElementById('newsModal');
    if (oldModal) oldModal.remove();

    // Добавить новое
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('newsModal'));
    modal.show();
}

// Экспорт функции
window.viewNewsArticle = viewNewsArticle;
