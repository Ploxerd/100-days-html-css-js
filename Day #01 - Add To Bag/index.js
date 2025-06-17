const imgs = [img1, img2, img3]

const imageDisplay = document.getElementById('display')

function ToggleOutline(img) {
    imgs.forEach(i => i.style.outline = "none");
    img.style.outline = "3px solid var(--product-color)";
    imageDisplay.src = img.children[0].src
}

imgs.forEach(img => {
    img.addEventListener('click', () => ToggleOutline(img))
})
