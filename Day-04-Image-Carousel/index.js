const imagesContainer = document.getElementById('slides');
const displayImage = document.getElementById('main-image');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');
let screen = document.querySelector('body');

let currentIndex = 0;

// An array containing links to images online!
const srcLink = [
    'https://static.vecteezy.com/system/resources/thumbnails/033/351/258/small_2x/beautiful-bright-wallpaper-nature-background-ai-generated-photo.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/051/235/438/small_2x/colorful-flowers-with-soft-bokeh-background-creating-a-dreamy-atmosphere-photo.jpeg',
    'https://t3.ftcdn.net/jpg/05/00/78/86/360_F_500788687_IdjsQiWUdvmm9lgxEHwlYkUhL5tYOhcx.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/001/971/264/small_2x/beautiful-cherry-blossom-with-bokeh-lights-background-concept-free-vector.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20230804/pngtree-beautiful-image-of-a-lake-in-countryside-in-a-summer-time-image_13000543.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/051/023/241/small_2x/serene-sunrise-over-a-calm-lake-with-mist-rising-in-the-early-morning-surrounded-by-trees-in-a-tranquil-natural-setting-photo.jpeg',
    'https://i.pinimg.com/736x/24/1a/91/241a91929a27066749bae703cfdaa3c6.jpg'
];

displayImage.src = srcLink[currentIndex];

// To display the image we use forEach to go through the link and paste them as the src
srcLink.forEach(el => {
    createImage(el);
});
highlighter();

const imageArr = Array.from(imagesContainer.querySelectorAll('img'));
let scrollAmount = screen.clientWidth / imageArr.length;

function slideNext(amount) {
    // ADD MORE TO IT
    imagesContainer.scrollBy(amount,0);
}

// Creating an img element through do DOM to simplify src adding
function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    imagesContainer.appendChild(image); 
};

function scrollMethods() {
    // Scroll via clicks 
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            displayImage.src = srcLink[currentIndex -= 1]
        }
        highlighter();
        slideNext(-scrollAmount)
    })

    nextBtn.addEventListener('click', () => {
        if (currentIndex < srcLink.length - 1) {
            displayImage.src = srcLink[currentIndex += 1];
        }
        highlighter();
        slideNext(scrollAmount);
    })

    // Scroll via keyboard 
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && currentIndex < srcLink.length - 1) {
            displayImage.src = srcLink[currentIndex += 1];
            highlighter();
            slideNext(scrollAmount)
        }

        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            displayImage.src = srcLink[currentIndex -= 1];
            highlighter();
            slideNext(-scrollAmount)
        }
    })
}

function highlighter() {
    const images = imagesContainer.querySelectorAll('img');
    images.forEach((el, index) => {
        if (index === currentIndex) {
            el.style.border = '3px solid white'
            el.style.boxShadow = '0 0 10px white'
        }
        else {
            el.style.border = 'none'
            el.style.boxShadow = 'none'
        }
    })
}

function clickedImage() {
    imageArr.forEach(el => {
        el.addEventListener('click', () => {
            displayImage.src = el.src
            currentIndex = imageArr.findIndex(child => child === el)
            highlighter();
        })
    })
}

clickedImage()
scrollMethods()