// Пример использования Invidious API
async function searchVideos(query) {
    const instance = 'https://invidious.namazso.eu'; // Выберите экземпляр Invidious
    const url = `${instance}/api/v1/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения информации о видео
async function getVideo(videoId) {
    const instance = 'https://invidious.namazso.eu';
    const url = `${instance}/api/v1/videos/${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения трендов
async function getTrending() {
    const instance = 'https://invidious.namazso.eu';
    const url = `${instance}/api/v1/trending`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Обработка клика по вкладкам
document.querySelectorAll('aside li').forEach(item => {
    item.addEventListener('click', async () => {
        const page = item.dataset.page;
        switch (page) {
            case 'home':
                displayHomePage();
                break;
            case 'trending':
                displayTrendingPage();
                break;
            // Добавьте обработку для остальных вкладок
        }
    });
});

// Пример отображения главной страницы
async function displayHomePage() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Главная страница</h2>';
    // Добавьте контент для главной страницы
}

// Пример отображения страницы популярных видео
async function displayTrendingPage() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Популярные видео</h2>';
    const trendingVideos = await getTrending();
    displaySearchResults(trendingVideos);
}

// Пример отображения страницы просмотра видео
async function displayVideoPage(videoId) {
    const videoData = await getVideo(videoId);
    const content = document.getElementById('video-content');
    content.innerHTML = `
        <div class="video-player">
            <iframe width="853" height="480" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-info">
            <h2>${videoData.title}</h2>
            <p>Просмотры: ${videoData.viewCount}</p>
            <p>Лайки: ${videoData.likeCount}</p>
            <p>${videoData.description}</p>
        </div>
        <div class="video-comments">
            <h3>Комментарии</h3>
            </div>
    `;
}

// Обработка результатов поиска (добавлена ссылка на страницу видео)
function displaySearchResults(results) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    results.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <h3><a href="video.html?v=${video.videoId}">${video.title}</a></h3>
            <img src="${video.thumbnails[0].url}" alt="${video.title}">
            <p>${video.description}</p>
        `;
        content.appendChild(videoElement);
    });
}

// Получение ID видео из URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Отображение страницы видео при загрузке video.html
if (window.location.pathname.endsWith('video.html')) {
    const videoId = getParameterByName('v');
    if (videoId) {
        displayVideoPage(videoId);
    }
}

// Пример обработки поиска
document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const results = await searchVideos(query);
    displaySearchResults(results);
});
