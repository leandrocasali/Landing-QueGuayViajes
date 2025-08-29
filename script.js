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

// Inicialización con autoplay
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1.2,
  spaceBetween: 15,
  autoplay: { 
    delay: 3000, 
    disableOnInteraction: false 
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: { 768: { slidesPerView: 3, spaceBetween: 30 } },
  preventClicks: false,
  preventClicksPropagation: false
});

// --- Detener autoplay en hover ---
const swiperEl = document.querySelector('.mySwiper');

swiperEl.addEventListener('mouseenter', () => {
  swiper.autoplay.stop();
});

swiperEl.addEventListener('mouseleave', () => {
  swiper.autoplay.start();
});

// --- Popup reutilizable ---
const modal =
  document.querySelector('#videoPopup') ||
  document.querySelector('#video-popup') ||
  document.querySelector('#popup');

const iframe =
  (modal && modal.querySelector('iframe')) ||
  document.querySelector('#popupVideo') ||
  document.querySelector('#popup-video');

// Delegación: sirve aunque hagas click sobre IMG, overlay o el título
document.querySelector('.mySwiper').addEventListener('click', (e) => {
  const card = e.target.closest('.video-card');  // <div class="swiper-slide video-card" ...>
  if (!card) return;

  const url = card.getAttribute('data-video');
  if (!url || !modal || !iframe) return;

  iframe.src = url + (url.includes('?') ? '&' : '?') + 'autoplay=1';
  modal.style.display = 'flex';
});

// Cierre (ajusta a tus IDs)
document.getElementById('closePopup')?.addEventListener('click', () => {
  modal.style.display = 'none';
  iframe.src = '';
});
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    iframe.src = '';
  }
});


// Scripts de Landing Pop Up 

// Referencias
const openPopup = document.getElementById('openPopup');
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');
const confirmarBtn = document.getElementById('confirmarBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');

// Abrir popup
openPopup.addEventListener('click', () => {
  popupOverlay.style.display = 'flex';
  popupOverlay.style.animation = 'fadeIn 0.3s ease forwards';
});

// Cerrar popup con fadeOut
closePopup.addEventListener('click', () => {
  popupOverlay.style.animation = 'fadeOut 0.3s ease forwards';
  setTimeout(() => {
    popupOverlay.style.display = 'none';
    // Resetear pasos
    step1.style.display = 'block';
    step2.style.display = 'none';
  }, 300);
});

// Confirmar teléfono → mostrar PIN
confirmarBtn.addEventListener('click', () => {
  step1.style.display = 'none';
  step2.style.display = 'block';
});
