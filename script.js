const cards = document.querySelectorAll('.card');
const popup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');
const closePopup = document.getElementById('closePopup');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const videoUrl = card.getAttribute('data-video');
    popupVideo.src = videoUrl + "?autoplay=1";
    popup.style.display = 'flex';
  });
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
  popupVideo.src = "";
});
