document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button');
    const songContainers = document.querySelectorAll('.song-container');
    
    // Function to generate random position
    function getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to position each song container randomly
    songContainers.forEach(container => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const randomX = getRandomPosition(0, windowWidth);
        const randomY = getRandomPosition(0, windowHeight);
        
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
