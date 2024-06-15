document.addEventListener('DOMContentLoaded', () => {
    const songContainers = document.querySelectorAll('.song-container');
    const orderButtons = document.querySelectorAll('.order-button');

    // Function to generate random position
    function getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to check if two rectangles overlap
    function isOverlapping(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    // Function to position each song container randomly without overlap
    function positionContainers() {
        const placedContainers = [];

        songContainers.forEach(container => {
            let positioned = false;

            while (!positioned) {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                const randomX = getRandomPosition(10, windowWidth - containerWidth - 60);
                const randomY = getRandomPosition(80, windowHeight * 11/4 - containerHeight);

                container.style.position = 'absolute';
                container.style.left = `${randomX}px`;
                container.style.top = `${randomY}px`;

                const containerRect = container.getBoundingClientRect();
                let overlap = false;

                for (const placedContainer of placedContainers) {
                    const placedRect = placedContainer.getBoundingClientRect();
                    if (isOverlapping(containerRect, placedRect)) {
                        overlap = true;
                        break;
                    }
                }

                if (!overlap) {
                    placedContainers.push(container);
                    positioned = true;
                }
            }
        });
    }

    positionContainers();

    // Event listener for order buttons
    orderButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const songContainer = songContainers[index];
            const songId = songContainer.id;

            // Get the specified position for the song
            const targetPosition = getDefaultPosition(songId);

            // Apply the target position to the song container
            songContainer.style.position = 'absolute';
            songContainer.style.left = targetPosition.left;
            songContainer.style.top = targetPosition.top;

            // Update order button text and style
            button.textContent = 'Ordered!';
            button.style.backgroundColor = 'green';
            button.disabled = true; // Disable further clicks
        });
    });

    // Function to get default position for a song
    function getDefaultPosition(songId) {
        const defaultPositions = {
            song1: { left: '625px', top: '160px' },
            song2: { left: '625px', top: '230px' },
            song3: { left: '625px', top: '300px' },
            song4: { left: '625px', top: '370px' },
            song5: { left: '625px', top: '440px' },
            song6: { left: '625px', top: '510px' },
            song7: { left: '625px', top: '580px' },
            song8: { left: '625px', top: '650px' },
            song9: { left: '625px', top: '720px' },
            song10: { left: '625px', top: '790px' },
            song11: { left: '625px', top: '860px' },
            song12: { left: '625px', top: '930px' },
            song13: { left: '625px', top: '1000px' },
            song14: { left: '625px', top: '1070px' },
            song15: { left: '625px', top: '1140px' },
            song16: { left: '625px', top: '1210px' },
            song17: { left: '625px', top: '1280px' },
            song18: { left: '625px', top: '1350px' },
            song19: { left: '625px', top: '1420px' },
            song20: { left: '625px', top: '1490px' },
            song21: { left: '625px', top: '1560px' },
            song22: { left: '625px', top: '1630px' },
            song23: { left: '625px', top: '1700px' },
            song24: { left: '625px', top: '1770px' },
            song25: { left: '625px', top: '1840px' },
            song26: { left: '625px', top: '1910px' },
            song27: { left: '625px', top: '1980px' },
            song28: { left: '625px', top: '2050px' },
            song29: { left: '625px', top: '2120px' },
            song30: { left: '625px', top: '2190px' },

            // aca van las honorable mentions

            song31: { left: '625px', top: '2360px' },
            song32: { left: '625px', top: '2430px' },
            song33: { left: '625px', top: '2500px' },
            song34: { left: '625px', top: '2570px' },
            song35: { left: '625px', top: '2640px' },
            song36: { left: '625px', top: '2710px' },
            song37: { left: '625px', top: '2780px' },
            song38: { left: '625px', top: '2850px' },
            song39: { left: '625px', top: '2920px' },
            song40: { left: '625px', top: '2990px' },
            song41: { left: '625px', top: '3060px' },
        };
        return defaultPositions[songId] || { left: '100px', top: '200px' }; // Default position if not specified
    }

    // Add click event listener to play buttons
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


