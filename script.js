// Пример использования Invidious API
async function searchVideos(query) {
    const instance = 'https://invidious.namazso.eu'; // Выберите экземпляр Invidious
    const url = `<span class="math-inline">\{instance\}/api/v1/search?q\=</span>{query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения информации о видео
async function getVideo(videoId) {
    const instance = 'https://invidious.namazso.eu';
    const url = `<span class="math-inline">\{instance\}/api/v1/videos/</span>{videoId}`;
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
    const url = `<span class="math-inline">\{instance\}/api/v1/channels/</span>{channelId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения видео канала
async function getChannelVideos(channelId) {
    const instance = 'https://invidious.namazso.eu';
    const url = `<span class="math-inline">\{instance\}/api/v1/channels/</span>{channelId}/videos`;
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
            <iframe width="853" height="480" src="https://www.youtube.com/embed/<span class="math-inline">\{videoId\}" frameborder\="0" allowfullscreen\></iframe\>
</div\>
<div class\="video\-info"\>
<h2\></span>{videoData.title}</h2>
            <p>Просмотры: ${videoData.viewCount}</p>
            <p>Лайки: <span class="math-inline">\{videoData\.likeCount\}</p\>
<p\></span>{videoData.description}</p>
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
            <h3><a href="video.html?v=<span class="math-inline">\{video\.videoId\}"\></span>{video.title}</a></h3>
            <a href="channel.html?c=<span class="math-inline">\{video\.authorId\}"\></span>{video.author}</a>
            <img src="<span class="math-inline">\{video\.thumbnails\[0\]\.url\}" alt\="</span>{video.title}">
            <p><span class="math-inline">\{video\.description\}</p\>
\`;
content\.appendChild\(videoElement\);
\}\);
\}
// Получение ID видео из URL
<1\>function getParameterByName\(name, <2\>url \= window\.location\.href\) \{
name \= name\.replace\(/\[\\\[\\\]\]/g, '\\\\$&'\);
const regex \= new RegExp\('\[?&\]' \+ name \+ '\(\=\(\[^&\#\]\*\)\|&\|\#\|</span>)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//
