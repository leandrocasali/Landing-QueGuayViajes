const cards = document.querySelectorAll('.card');
const popup = document.getElementById('popup');
const popupVideo = document.getElementById('popup-video');
const closeBtn = document.getElementById('close');

// Abrir popup con el video
cards.forEach(card => {
  card.addEventListener('click', () => {
    const videoUrl = card.getAttribute('data-video') + "?autoplay=1";
    popupVideo.src = videoUrl;
    popup.style.display = 'flex';
  });
});

// Cerrar popup
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  popupVideo.src = ""; // detener video
});

// Cerrar si se hace click fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
    popupVideo.src = "";
  }
});
