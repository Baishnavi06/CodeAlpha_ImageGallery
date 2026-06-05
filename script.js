const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const downloadBtn = document.getElementById('download-btn');
const allImages = Array.from(document.querySelectorAll('.gallery-item'));
const filterBtns = document.querySelectorAll('.filter-btn');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentFilteredImages = [...allImages]; 
let currentIndex = 0;

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        
        filterBtns.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        currentFilteredImages = []; // Reset the array

        allImages.forEach(img => {
            if (category === 'all' || img.getAttribute('data-category') === category) {
                img.style.display = 'block'; 
                currentFilteredImages.push(img); 
            } else {
                img.style.display = 'none';
            }
        });
    });
});

allImages.forEach((img) => {
    img.addEventListener('click', (e) => {
        currentIndex = currentFilteredImages.indexOf(e.target);
        updateLightboxImage();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

function updateLightboxImage() {
    if (currentFilteredImages.length === 0) return;
    const currentImg = currentFilteredImages[currentIndex];
    lightboxImg.src = currentImg.src;
    downloadBtn.href = currentImg.src;
}

function changeImage(direction) {
    if (currentFilteredImages.length === 0) return;
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = currentFilteredImages.length - 1;
    } else if (currentIndex >= currentFilteredImages.length) {
        currentIndex = 0;
    }
    updateLightboxImage();
}

prevBtn.addEventListener('click', () => changeImage(-1));
nextBtn.addEventListener('click', () => changeImage(1));

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if(currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = 'Toggle Light Mode 🌞';
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');
    if (theme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = 'Toggle Dark Mode 🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = 'Toggle Light Mode 🌞';
    }
});