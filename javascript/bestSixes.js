document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        category.addEventListener('click', (event) => {
            // Prevent the default action of hiding the song list when clicking a song item
            if (event.target.closest('.song-item')) return;

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
            const icon = button.querySelector('i');
            
            if (audio.paused) {
                // Pause all other audio elements
                document.querySelectorAll('.audio-player').forEach(player => {
                    if (player !== audio) {
                        player.pause();
                        player.currentTime = 0; // Reset audio
                        const playButton = player.previousElementSibling;
                        playButton.querySelector('i').classList.remove('fa-pause');
                        playButton.querySelector('i').classList.add('fa-play');
                    }
                });

                audio.play();
                audio.paused = false;
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');

            } 
            else {
                audio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }

            audio.addEventListener('ended', () => {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            });
        });
    });
});
