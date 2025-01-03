const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imgsLoaded = 0;
let totalImgs = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'LqO-GuGO5fPM-8hFm8E0VqxkgFlH4E4sHyAB5RA4FEk';
const apiUrl =`https://api.unsplash.com/photos/random?query=wildlife&client_id=${apiKey}&count=${count}`;

// images loaded
function imgLoaded () {
    imgsLoaded++;
    if (imgsLoaded === totalImgs) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
    imgsLoaded = 0;
    totalImgs = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
            name: photo.user.name,
        });
        img.addEventListener('load', imgLoaded);
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        alert(error);
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();
