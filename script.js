const imageContainer  = document.getElementById('image-container');
const loader  = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoData = [];
// const clientID = 'wKa2cN4Za2wQjoMvveZlQq0R3eSW9-7sTkKv1m4yUZE';
// const clientID = 'UFQlNy_QLvz3V5hjQheRCbavRJyrcfP_dWi_WzX5ScY';
const clientID = 'bqlgN50xXUzqO_9GfChkplPLZkZr-Zc6ep2z12e1dZA';
const limit = 30;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${clientID}&count=${limit}`;

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
    }
}


// Helper function to set attributes on DOM Element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photoData.length;
    photoData.forEach((photo) => {
        // Creating <a> to link to Unsplash
        const hyperLink = document.createElement('a');
        setAttributes(hyperLink, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded)
        hyperLink.appendChild(img);
        imageContainer.appendChild(hyperLink)
    });
}

//Get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photoData = await response.json();
        displayPhotos();
    }catch (error){
        console.log(error.message);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready = false;
       getPhotos();
    }
});

getPhotos();