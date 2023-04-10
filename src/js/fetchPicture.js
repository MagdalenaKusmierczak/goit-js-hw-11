//Library import
import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchPicture = (keyWord, page, perPage) => {
  return axios
    .get('?', {
      params: {
        key: '35262306-2ee6f92f6616bfcf6c7291f6d',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: perPage,
        safesearch: 'true',
        page: page,
        q: keyWord,
      },
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export { fetchPicture };
