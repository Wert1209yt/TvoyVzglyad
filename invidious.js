// Пример использования Invidious API
async function searchVideos(query) {
    const instance = 'https://inv.nadeko.net'; // Выберите экземпляр Invidious
    const url = `${instance}/api/v1/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения информации о видео
async function getVideo(videoId) {
    const instance = 'https://inv.nadeko.net/';
    const url = `${instance}/api/v1/videos/${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения трендов
async function getTrending() {
    const instance = 'https://inv.nadeko.net';
    const url = `${instance}/api/v1/trending`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения информации о канале
async function getChannel(channelId) {
    const instance = 'https://inv.nadeko.net';
    const url = `${instance}/api/v1/channels/${channelId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения видео канала
async function getChannelVideos(channelId) {
    const instance = 'https://inv.nadeko.net';
    const url = `${instance}/api/v1/channels/${channelId}/videos`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения плейлиста
async function getPlaylist(playlistId) {
    const instance = 'https://inv.nadeko.net';
    const url = `${instance}/api/v1/playlists/${playlistId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения комментариев к видео
async function getVideoComments(videoId) {
    const instance = 'https://inv.nadeko.net';
    const url = `${instance}/api/v1/comments/${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Пример получения рекомендуемых видео
async function getRelatedVideos(videoId) {
    const instance = 'https://inv.nadeko.net';
    const url = `${instance}/api/v1/videos/${videoId}/related`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
