let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.slider').style.width = `${100 * totalSlides}%`;

function showSlide(index) {
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Initialize the slider
showSlide(currentSlide);



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
