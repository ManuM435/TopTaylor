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
                const randomY = getRandomPosition(120, windowHeight * 11/4 - containerHeight);

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
        // Calculate the 'top' position dynamically
        const firstTopPosition = 160;
        const interval = 30; // Interval between each 'top' position
        const extraHonor = 75; // Extra space for honorable mentions
    
        // Calculate the 'top' position based on songId
        let topPosition = firstTopPosition + ((parseInt(songId.replace('song', '')) - 1) * interval);
    
        const defaultPositions = {
            song1: { left: '625px', top: `${topPosition}px` },
            song2: { left: '625px', top: `${topPosition + interval}px` },
            song3: { left: '625px', top: `${topPosition + interval * 2}px` },
            song4: { left: '625px', top: `${topPosition + interval * 3}px` },
            song5: { left: '625px', top: `${topPosition + interval * 4}px` },
            song6: { left: '625px', top: `${topPosition + interval * 5}px` },
            song7: { left: '625px', top: `${topPosition + interval * 6}px` },
            song8: { left: '625px', top: `${topPosition + interval * 7}px` },
            song9: { left: '625px', top: `${topPosition + interval * 8}px` },
            song10: { left: '625px', top: `${topPosition + interval * 9}px` },
            song11: { left: '625px', top: `${topPosition + interval * 10}px` },
            song12: { left: '625px', top: `${topPosition + interval * 11}px` },
            song13: { left: '625px', top: `${topPosition + interval * 12}px` },
            song14: { left: '625px', top: `${topPosition + interval * 13}px` },
            song15: { left: '625px', top: `${topPosition + interval * 14}px` },
            song16: { left: '625px', top: `${topPosition + interval * 15}px` },
            song17: { left: '625px', top: `${topPosition + interval * 16}px` },
            song18: { left: '625px', top: `${topPosition + interval * 17}px` },
            song19: { left: '625px', top: `${topPosition + interval * 18}px` },
            song20: { left: '625px', top: `${topPosition + interval * 19}px` },
            song21: { left: '625px', top: `${topPosition + interval * 20}px` },
            song22: { left: '625px', top: `${topPosition + interval * 21}px` },
            song23: { left: '625px', top: `${topPosition + interval * 22}px` },
            song24: { left: '625px', top: `${topPosition + interval * 23}px` },
            song25: { left: '625px', top: `${topPosition + interval * 24}px` },
            song26: { left: '625px', top: `${topPosition + interval * 25}px` },
            song27: { left: '625px', top: `${topPosition + interval * 26}px` },
            song28: { left: '625px', top: `${topPosition + interval * 27}px` },
            song29: { left: '625px', top: `${topPosition + interval * 28}px` },
            song30: { left: '625px', top: `${topPosition + interval * 29}px` },

            // Aca las honorable mentions

            song31: { left: '625px', top: `${topPosition + interval * 30 + extraHonor}px` },
            song32: { left: '625px', top: `${topPosition + interval * 31 + extraHonor}px` },
            song33: { left: '625px', top: `${topPosition + interval * 32 + extraHonor}px` },
            song34: { left: '625px', top: `${topPosition + interval * 33 + extraHonor}px` },
            song35: { left: '625px', top: `${topPosition + interval * 34 + extraHonor}px` },
            song36: { left: '625px', top: `${topPosition + interval * 35 + extraHonor}px` },
            song37: { left: '625px', top: `${topPosition + interval * 36 + extraHonor}px` },
            song38: { left: '625px', top: `${topPosition + interval * 37 + extraHonor}px` },
            song39: { left: '625px', top: `${topPosition + interval * 38 + extraHonor}px` },
            song40: { left: '625px', top: `${topPosition + interval * 39 + extraHonor}px` },
            song41: { left: '625px', top: `${topPosition + interval * 40 + extraHonor}px` },
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


