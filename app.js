const auth = '563492ad6f917000010000019ea56715503f4623b75c0d96160a233f';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
let searchValue;

//async function for fetching curated images to display on load
async function curatedPhotos() {
	//declare a way to fetch curated list of photos and set it to fetch json objectsfrom url via GET method and our API key
	const dataFetch = await fetch(
		'https://api.pexels.com/v1/curated?per_page=15&page1',
		{
			method: 'GET',
			headers: { Accept: 'application/json', Authorization: auth },
		}
	);
	//save the data as json under data
	const data = await dataFetch.json();
	//loop over array of curated photos and for each photo:
	data.photos.forEach((photo) => {
		//create a div to house it
		const galleryImg = document.createElement('div');
		//add the class of 'gallery-img' for styling
		galleryImg.classList.add('.gallery-img');
		//add innerHTML to the div to display as the img itself and the name of the photographer
		galleryImg.innerHTML = `<img src='${photo.src.large}'></img>
    <p>${photo.photographer}</p>`;
		//add the complete div to the gallery section
		gallery.appendChild(galleryImg);
	});
}

//invoke the curated photos list
curatedPhotos();
