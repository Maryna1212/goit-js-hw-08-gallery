import galleryItems from './gallery-items.js';

const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    modalContainer: document.querySelector('.lightbox'),
    openLightboxImage: document.querySelector('.lightbox__image'),
};

const itemsMarkup = createGalleryItems(galleryItems);

refs.galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);
refs.galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
    return `
     <li class="gallery__item">
     <a
      class="gallery__link"
       href="${original}"
     >
     <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
     </a>
    </li>
    `;
  })
    .join('');
}

function onGalleryContainerClick(evt) {
    evt.preventDefault();

  const isGalleryImageEl = evt.target.classList.contains('gallery__image');

  if (!isGalleryImageEl) {
    return;
  }
    
    const galleryImageSrc = evt.target.dataset.source;

    refs.modalContainer.classList.add('is-open');
    refs.modalContainer.addEventListener('click', onCloseModalByClick);

    changeImageSrc(galleryImageSrc);
    onCloseModalByClick(evt);    
}

function onCloseModalByClick(evt) {
    if (evt.target.nodeName === 'IMG') {
    return;
  }

  refs.modalContainer.classList.remove('is-open');
}

function changeImageSrc(source) {
    refs.openLightboxImage.src = source;
}

