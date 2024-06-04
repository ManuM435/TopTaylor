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

                const randomX = getRandomPosition(10, windowWidth - containerWidth - 20);
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

    // Event listener for order buttons
    orderButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const songContainer = songContainers[index];
            const songId = songContainer.id;

            // Ensure we have the correct target position from CSS
            const targetElement = document.getElementById(songId);
            const targetPosition = window.getComputedStyle(targetElement);
            const left = targetPosition.left;
            const top = targetPosition.top;

            console.log(`Moving ${songId} to specified position: left=${left}, top=${top}`);

            // Apply the target position to the song container
            const songWrapper = songContainer.querySelector('.song-wrapper');
            songWrapper.style.position = 'absolute';
            songWrapper.style.left = left;
            songWrapper.style.top = top;

            // Update order button text and style
            button.textContent = 'Ordered!';
            button.style.backgroundColor = 'green';
            button.disabled = true; // Disable further clicks
        });
    });
});
