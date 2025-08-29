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

// JavaScript para manejar el popup y validaciones
const subscribeBtn = document.getElementById('subscribe-btn');
const overlay = document.getElementById('overlay');
const closePopup = document.getElementById('close-popup');
const confirmBtn = document.getElementById('confirm-btn');
const continueBtn = document.getElementById('continue-btn');
const closeSuccessBtn = document.getElementById('close-success-btn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const phoneInput = document.getElementById('phone');
const pinInput = document.getElementById('pin');
const phoneError = document.getElementById('phone-error');
const pinError = document.getElementById('pin-error');
const successMessage = document.getElementById('success-message');

// Mostrar popup
subscribeBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    step1.style.display = 'block';
    step2.style.display = 'none';
    step3.style.display = 'none';
    phoneInput.value = '';
    pinInput.value = '';
    phoneError.style.display = 'none';
    pinError.style.display = 'none';
});

// Cerrar popup con la X
closePopup.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Cerrar popup al hacer clic en el overlay
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

// Validar y pasar a paso 2
confirmBtn.addEventListener('click', () => {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/; // Exactamente 10 dígitos

    if (!phoneRegex.test(phone)) {
        phoneError.style.display = 'block';
        return;
    }

    phoneError.style.display = 'none';
    step1.style.display = 'none';
    step2.style.display = 'block';
});

// Validar PIN y pasar a paso 3
continueBtn.addEventListener('click', () => {
    const pin = pinInput.value.trim();
    const pinRegex = /^\d{4}$/; // Exactamente 4 dígitos

    if (!pinRegex.test(pin)) {
        pinError.style.display = 'block';
        return;
    }

    pinError.style.display = 'none';
    step2.style.display = 'none';
    step3.style.display = 'block';
    successMessage.textContent = `Suscripción completada con éxito! Teléfono: +58${phoneInput.value}`;
});

// Cerrar popup desde el botón de éxito
closeSuccessBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});