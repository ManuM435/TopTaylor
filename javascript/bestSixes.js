document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        const songList = category.querySelector('.song-list');
        const honorableMentionsToggle = category.querySelector('.honorable-mentions-toggle');
        const honorableMentions = category.querySelector('.honorable-mentions');

        category.addEventListener('click', (event) => {
            if (event.target.closest('.song-item') || event.target.closest('.honorable-mentions-toggle') || event.target.closest('.play-button')) return;

            const isExpanded = category.classList.contains('expanded');

            if (isExpanded) {
                songList.style.display = 'none';
                honorableMentions.style.display = 'none'; // Collapse honorable mentions
                category.classList.remove('expanded');
                honorableMentions.classList.remove('expanded'); // Remove expanded class from honorable mentions
            } else {
                songList.style.display = 'block';
                category.classList.add('expanded');
            }
        });

        if (honorableMentionsToggle) {
            honorableMentionsToggle.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the event from bubbling up to the category click event

                const isHMExpanded = honorableMentions.classList.contains('expanded');

                if (isHMExpanded) {
                    honorableMentions.style.display = 'none';
                    honorableMentions.classList.remove('expanded');
                } else {
                    honorableMentions.style.display = 'block';
                    honorableMentions.classList.add('expanded');
                }
            });
        }
    });document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button');
    const songContainers = document.querySelectorAll('.song-container');
    
    // Function to generate random position
    function getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to position each song container randomly
    songContainers.forEach(container => {
        const bodyWidth = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        // Ensure the containers stay within the viewport
        const randomX = getRandomPosition(0, bodyWidth - containerWidth);
        const randomY = getRandomPosition(0, bodyHeight - containerHeight);
        
        container.style.position = 'absolute';
        container.style.left = randomX + 'px';
        container.style.top = randomY + 'px';
    });
    
    // Add click event listener to play buttons
    playButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the category click event
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
});


    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the category click event
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
});
