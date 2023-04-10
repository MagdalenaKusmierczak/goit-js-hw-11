//Import partial js files
import { setGallery } from './js/setGallery';
import { fetchPicture } from './js/fetchPicture';
//
//Library import
import Notiflix from 'notiflix';
import { toInteger } from 'lodash';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//
//Main selectors
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const searchedInput = document.querySelector('[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');
//
//Simplelightbox gallery setting
const simpleGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'ALT',
  captionDelay: 250,
});
//
//Setting gallery variables
let page;
let objectGallery;
const perPage = 40;
let maxPages;
//
//Setting loading next pages button visibility
function toggleBtn() {
  loadMoreBtn.parentElement.classList.toggle('is-hidden');
}
//Setting search loading and matching alerts
searchForm.lastElementChild.addEventListener('click', async e => {
  if (!loadMoreBtn.parentElement.classList.contains('is-hidden')) toggleBtn();
  gallery.innerHTML = '';
  e.preventDefault();
  page = 1;
  objectGallery = await fetchPicture(searchedInput.value, page, perPage);
  if (objectGallery.hits.length === 0)
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  Notiflix.Notify.success(
    `"Hooray! We found ${objectGallery.totalHits} images."`
  );
  maxPages = toInteger(objectGallery.totalHits / perPage) + 1;
  gallery.insertAdjacentHTML('beforeend', setGallery(objectGallery.hits));
  simpleGallery.refresh();
  toggleBtn();
});
//
//Setting next pages loading and reaching the end of reasults alert
loadMoreBtn.addEventListener('click', async () => {
  if (maxPages === page) {
    toggleBtn();
    return Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
  page++;
  objectGallery = await fetchPicture(searchedInput.value, page, perPage);
  gallery.insertAdjacentHTML('beforeend', setGallery(objectGallery.hits));
  simpleGallery.refresh();
});
