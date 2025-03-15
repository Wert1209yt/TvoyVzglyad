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

// Пример получения информации о канале
async function getChannel(channelId) {
    const instance = 'https://invidious.namazso.eu';
    const url = `${instance}/api/v1/channels/${channelId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения видео канала
async function getChannelVideos(channelId) {
    const instance = 'https://invidious.namazso.eu';
    const url = `${instance}/api/v1/channels/${channelId}/videos`;
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
            <a href="channel.html?c=${videoData.authorId}">${videoData.author}</a>
            <p>Просмотры: ${videoData.viewCount}</p>
            <p>Лайки: ${videoData.likeCount}</p>
            <p>${videoData.description}</p>
        </div>
        <div class="video-comments">
            <h3>Комментарии</h3>
            </div>
    `;
}

// Обработка результатов поиска (добавлена ссылка на страницу видео и канала)
function displaySearchResults(results, contentId = 'content') {
    const content = document.getElementById(contentId);
    content.innerHTML = '';
    results.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <h3><a href="video.html?v=${video.videoId}">${video.title}</a></h3>
            <a href="channel.html?c=${video.authorId}">${video.author}</a>
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

// Отображение страницы канала
async function displayChannelPage(channelId) {
    const channelData = await getChannel(channelId);
    const channelHeader = document.getElementById('channel-header');
    const channelBanner = document.getElementById('channel-banner');

    channelBanner.style.backgroundImage = `url(${channelData.banner})`;
    channelBanner.style.backgroundSize = 'cover';
    channelBanner.style.height = '200px'; // Установите желаемую высоту баннера

    channelHeader.innerHTML = `
        <img src="${channelData.authorThumbnails[0].url}" alt="${channelData.author}">
        <h2>${channelData.author}</h2>
        <p>Подписчики: ${channelData.subCount}</p>
    `;
    displayChannelTab(channelId, 'home');
}

// Отображение страницы канала при загрузке channel.html
if (window.location.pathname.endsWith('channel.html')) {
    const channelId = getParameterByName('c');
    if (channelId) {
        displayChannelPage(channelId);
    }
}

// Добавьте обработку клика на результаты поиска, чтобы открывалась страница канала
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.href.includes('channel.html')) {
        event.preventDefault();
        const channelId = getParameterByName('c', event.target.href);
        if (channelId) {
            window.location.href = `channel.html?c=${channelId}`;
        }
    }
});

// Обработка клика по вкладкам канала
document.addEventListener('click', async (event) => {
    if (event.target.matches('#channel-tabs button')) {
        const tab = event.target.dataset.tab;
        const channelId = getParameterByName('c');
        if (channelId) {
            displayChannelTab(channelId, tab);
        }
    }
});

// Отображение вкладки канала
async function displayChannelTab(channelId, tab) {
    const tabContent = document.getElementById('channel-tab-content');
    tabContent.innerHTML = '';
    switch (tab) {
        case 'home':
            tabContent.innerHTML = '<h2>Главная</h2>';
            // Добавьте контент для главной страницы канала
            break;
        case 'videos':
            const videos = await getChannelVideos(channelId);
            displaySearchResults(videos, 'channel-tab-content');
            break;
        case 'community':
            tabContent.innerHTML = '<h2>Сообщество</h2>';
            // Добавьте контент для сообщества канала
            break;
        case 'about':
            const channelData = await getChannel(channelId);
            tabContent.innerHTML = `<h2>О канале ${channelData.author}</h2><p>${channelData.description}</p>`;
            break;
    }
}

// Пример обработки поиска
document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const results = await searchVideos(query);
    displaySearchResults(results);
});
