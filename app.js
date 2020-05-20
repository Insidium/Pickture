const auth = '563492ad6f917000010000019ea56715503f4623b75c0d96160a233f';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners

//listen for change to input based on entered value
searchInput.addEventListener('input', updateInput);
//clear input field on click
searchInput.addEventListener('click', clearField);
//listen for form submit and search for the value, running searchPhotos
form.addEventListener('submit', (e) => {
	//prevent form from clearing the value on refresh, causing network error
	e.preventDefault();
	//set current search to search value
	currentSearch = searchValue;
	//search for photos based on value
	searchPhotos(searchValue);
});
//on clicking more btn, load more images below
more.addEventListener('click', loadMore);

//log event under searchValue variable as the entered text in the input
function updateInput(e) {
	searchValue = e.target.value;
}

async function fetchApi(url) {
	//declare a way to fetch list of photos and set it to fetch json objects from url via GET method and our API key
	const dataFetch = await fetch(url, {
		method: 'GET',
		headers: { Accept: 'application/json', Authorization: auth },
	});
	//save the data as json under data
	const data = await dataFetch.json();
	return data;
}

async function generatePictures(data) {
	//loop over array of curated photos and for each photo:
	data.photos.forEach((photo) => {
		//create a div to house it
		const galleryImg = document.createElement('div');
		//add the class of 'gallery-img' for styling
		galleryImg.classList.add('gallery-img');
		//add innerHTML to the div to display as the name of the photographer, a dowload link for original size img and the img itself
		galleryImg.innerHTML = `
    <div class='gallery-info'>
    <a href='${photo.photographer_url}' target='_blank'><p>${photo.photographer}</p></a>
    <a href='${photo.src.original}' target='_blank'>Download</a>
    </div>
    <img src='${photo.src.large}'></img>
  `;
		//add the complete div to the gallery section
		gallery.appendChild(galleryImg);
	});
}

//async fetch curated images to display on load
async function curatedPhotos() {
	//set fetchLink to curated API url
	fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page1';
	//assign data the fetched list of curated images via method in fetchApi function
	const data = await fetchApi(fetchLink);
	//invoke getting pictures function
	generatePictures(data);
}

//async search for photos, which takes in the query and:
async function searchPhotos(query) {
	//invoke clear photos function
	clearGallery();
	//set fetchLink to queried API url
	fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page1`;
	//assign data the fetched list of queried images via method in fetchApi function
	const data = await fetchApi(fetchLink);
	//invoke getting pictures function
	generatePictures(data);
}

//clear existing photos in gallery and input on new search
function clearGallery() {
	//clear gallery
	gallery.innerHTML = '';
}

function clearField() {
	searchInput.value = '';
}

//async load more images on more btn click
async function loadMore() {
	//increment page by 1
	page++;
	//if searching for images, load more related images to query
	if (currentSearch) {
		fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
		//else load more random curated images
	} else {
		fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
	}
	//retrieve data based on the fetch logic above
	const data = await fetchApi(fetchLink);
	generatePictures(data);
}

//invoke the curated photos list
curatedPhotos();
