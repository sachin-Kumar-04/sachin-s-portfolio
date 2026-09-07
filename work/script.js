const videoGrid = document.querySelector('#video-grid');
const imageSliderTrack = document.querySelector('#image-slider-track');
const imagePrevious = document.querySelector('#image-previous');
const imageNext = document.querySelector('#image-next');
const videoModal = document.querySelector('#video-modal');
const expandedVideo = document.querySelector('#expanded-video');
const closeVideoButton = document.querySelector('#video-modal-close');

const videoSources = [
  './video1.mp4', './video2.mp4', './video3.mp4',
  './video4.mp4', './video5.mp4', './video6.mp4',
  './video7.mp4', './video8.mp4', './video9.mp4',
  './video10.mp4', './video11.mp4', './video13.mp4'
];
const imageSources = [
  '10img.jpeg', '11img.jpeg', '12img.jpeg', '13.jpeg', '14.jpeg',
  '1img.jpeg', '2img.jpeg.jpeg', '3img.jpeg.jpeg', '4img.jpeg', '5img.jpeg',
  '6img.jpeg', '7img.jpeg', '8img.jpeg', '9img.jpeg'
].map((filename) => `./all%20statics/${filename}`);
const brandSources = [
  'b%26s.png', 'barks.png', 'bio.png', 'cosiq.png', 'dhariwal.png', 'evermore.png',
  'healthstores.png', 'nutri.png', 'paudha.png', 'skoots.png', 't%26b.png', 'troost.png', 'zarf.png'
].map((filename) => `./brands/${filename}`);

const brandMarkup = [...brandSources, ...brandSources].map((source, index) =>
  `<div class="brand-logo"><img src="${source}" alt="Brand logo ${index % brandSources.length + 1}" loading="lazy" /></div>`
).join('');
document.querySelector('#brands-track').innerHTML = brandMarkup;

imageSliderTrack.innerHTML = imageSources.map((source, index) =>
  `<img class="image-slide" src="${source}" alt="Selected still ${index + 1}" loading="lazy" />`
).join('');

const scrollImages = (direction) => {
  const slide = imageSliderTrack.querySelector('.image-slide');
  imageSliderTrack.scrollBy({ left: direction * (slide.getBoundingClientRect().width + 18), behavior: 'smooth' });
};

imagePrevious.addEventListener('click', () => scrollImages(-1));
imageNext.addEventListener('click', () => scrollImages(1));

videoGrid.innerHTML = videoSources.map((source, index) => `
  <article class="slide">
    <video autoplay muted loop playsinline preload="metadata" aria-label="Project ${index + 1} video">
      <source src="${source}" type="video/mp4" />
    </video>
    <button class="slide-open" type="button" data-video="${source}" aria-label="Open project ${index + 1} video"></button>
  </article>`).join('');

function openVideo(source) {
  expandedVideo.src = source;
  expandedVideo.load();
  videoModal.classList.add('is-open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  expandedVideo.play().catch(() => {});
}

function closeVideo() {
  expandedVideo.pause();
  expandedVideo.removeAttribute('src');
  expandedVideo.load();
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

videoGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.slide-open');
  if (button) openVideo(button.dataset.video);
});
closeVideoButton.addEventListener('click', closeVideo);
videoModal.addEventListener('click', (event) => {
  if (event.target === videoModal) closeVideo();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal.classList.contains('is-open')) closeVideo();
});
