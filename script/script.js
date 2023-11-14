// Carregue os vídeos do YouTube
function onYouTubeIframeAPIReady() {
    var playerElements = document.querySelectorAll('.youtube-video');
    
    playerElements.forEach(function (element) {
        var videoId = element.getAttribute('data-id');
        
        var player = new YT.Player(element, {
            height: '315',
            width: '560',
            videoId: videoId,
            playerVars: {
                'autoplay': 0,  // 1 para autoplay
                'controls': 1,  // 0 para esconder controles
                'showinfo': 1,  // 0 para esconder informações do vídeo
                'rel': 0,       // 0 para não mostrar vídeos relacionados ao final
            }
        });
    });
}
