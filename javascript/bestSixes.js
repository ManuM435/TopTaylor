document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const songList = category.querySelector('.song-list');
            if (songList.style.display === 'block') {
                songList.style.display = 'none';
            } else {
                songList.style.display = 'block';
            }
        });
    });

    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audio = button.nextElementSibling;
            if (audio.paused) {
                // Pause all other audio elements
                document.querySelectorAll('.audio-player').forEach(player => {
                    if (player !== audio) {
                        player.pause();
                    }
                });
                audio.play();
                button.textContent = 'Pause';
            } else {
                audio.pause();
                button.textContent = 'Play';
            }

            audio.addEventListener('ended', () => {
                button.textContent = 'Play';
            });
        });
    });
});
