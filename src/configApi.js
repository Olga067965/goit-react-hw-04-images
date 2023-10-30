const apiKey = '38684202-1b965ae9aa77d23174a7bb28f';
const baseUrl = 'https://pixabay.com/api/';

const fetchImages = (searchQuery, currentPage, perPage = 12) => {
  const url = `${baseUrl}?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
};

export { fetchImages };
