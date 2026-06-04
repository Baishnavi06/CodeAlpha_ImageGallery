const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const allImages = document.querySelectorAll('.gallery-item');

allImages.forEach((img) => {
    img.addEventListener('click', (e) => {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});