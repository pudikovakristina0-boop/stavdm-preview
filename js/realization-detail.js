const detailSlug = new URLSearchParams(window.location.search).get('projekt');
const detailProject = Array.isArray(window.stavdmProjects)
  ? window.stavdmProjects.find(project => project.slug === detailSlug)
  : null;

const detailMain = document.querySelector('#realization-detail');
const notFound = document.querySelector('#project-not-found');

if (!detailProject) {
  if (detailMain) detailMain.remove();
  if (notFound) notFound.hidden = false;
  document.querySelector('#gallery-lightbox')?.remove();
} else {
  if (notFound) notFound.remove();
  const heroImage = detailProject.hero || detailProject.cover;
  const galleryPhotos = detailProject.photos.filter(
    photo => photo !== detailProject.cover && photo !== heroImage
  );

  document.title = `${detailProject.name} | StavDM`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = detailProject.description;

  const cover = document.querySelector('#detail-cover');
  cover.src = heroImage;
  cover.alt = `${detailProject.name} – ${detailProject.location}`;

  document.querySelector('#detail-type').textContent = detailProject.type;
  document.querySelector('#detail-title').textContent = detailProject.name;
  document.querySelector('#detail-location').textContent = detailProject.location;
  document.querySelector('#detail-year').textContent = detailProject.year;
  document.querySelector('#detail-description').textContent = detailProject.description;

  const heroDescription = document.querySelector('#detail-hero-description');
  heroDescription.textContent = detailProject.description;
  heroDescription.hidden = false;

  document.querySelector('#summary-location').textContent = detailProject.location;
  document.querySelector('#summary-year').textContent = detailProject.year;
  document.querySelector('#summary-type').textContent = detailProject.type;
  document.querySelector('#summary-count').textContent = galleryPhotos.length;
  const galleryCount = document.querySelector('#gallery-count');
  galleryCount.textContent = `${galleryPhotos.length} fotografií`;
  galleryCount.hidden = true;

  const gallery = document.querySelector('#detail-gallery');
  if (galleryPhotos.length >= 4 && galleryPhotos.length % 3 === 1) {
    gallery.classList.add('gallery-tail-split');
  }
  const lightbox = document.querySelector('#gallery-lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const closeButton = document.querySelector('.lightbox-close');
  let currentPhoto = 0;
  let lightboxTrigger = null;

  lightboxImage.src = heroImage;
  lightboxImage.alt = detailProject.name;

  const showPhoto = index => {
    currentPhoto = (index + galleryPhotos.length) % galleryPhotos.length;
    lightboxImage.src = galleryPhotos[currentPhoto];
    lightboxImage.alt = `${detailProject.name} – fotografia ${currentPhoto + 1}`;
    lightboxCaption.textContent = `${detailProject.name} · ${currentPhoto + 1} / ${galleryPhotos.length}`;
  };

  const openLightbox = index => {
    lightboxTrigger = document.activeElement;
    showPhoto(index);
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (lightboxTrigger instanceof HTMLElement) lightboxTrigger.focus();
  };

  galleryPhotos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.className = 'gallery-photo';
    button.type = 'button';
    button.setAttribute('aria-label', `Otvoriť fotografiu ${index + 1}`);

    const image = document.createElement('img');
    image.src = photo;
    image.alt = `${detailProject.name} – fotografia ${index + 1}`;
    image.loading = index < 4 ? 'eager' : 'lazy';
    image.decoding = 'async';

    button.appendChild(image);
    button.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(button);
  });

  closeButton.addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
  document.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
    if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
    if (event.key === 'Tab') {
      const controls = [...lightbox.querySelectorAll('button:not([disabled])')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
