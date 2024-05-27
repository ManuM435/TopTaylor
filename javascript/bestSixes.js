document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        category.addEventListener('click', (event) => {
            // Prevent the default action of hiding the song list when clicking a song item or the honorable mentions toggle
            if (event.target.closest('.song-item') || event.target.closest('.honorable-mentions-toggle')) return;

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
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
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

    const honorableMentionsToggles = document.querySelectorAll('.honorable-mentions-toggle');

    honorableMentionsToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the event from bubbling up to the category click event
            const honorableMentions = toggle.nextElementSibling;
            if (honorableMentions.style.display === 'block') {
                honorableMentions.style.display = 'none';
            } else {
                honorableMentions.style.display = 'block';
            }
        });
    });
});
