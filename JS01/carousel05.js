let slideIndices = [];

// Initialize carousel slides on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach((carousel, index) => {
        slideIndices[index] = 0;
        showSlides(0, index);
    });

    // Optional: Auto slide change every 3 seconds
    setInterval(() => {
        carousels.forEach((carousel, index) => {
            slideIndices[index]++;
            showSlides(slideIndices[index], index);
        });
    }, 10000);
});

// Function to show slides
function showSlides(n, carouselIndex) {
    const carousel = document.querySelectorAll('.carousel-container')[carouselIndex];
    const slides = carousel.querySelectorAll('.carousel-slide .slide');
    const dots = document.querySelectorAll(`.carousel-dots[data-carousel="${carouselIndex + 1}"] .dot`);
    
    if (n >= slides.length) { slideIndices[carouselIndex] = 0; }
    if (n < 0) { slideIndices[carouselIndex] = slides.length - 1; }

    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndices[carouselIndex]].style.display = 'block';
    dots[slideIndices[carouselIndex]].classList.add('active');
}

// Function to handle dot clicks
function currentSlide(n, carouselIndex) {
    slideIndices[carouselIndex] = n - 1;
    showSlides(slideIndices[carouselIndex], carouselIndex);
}
