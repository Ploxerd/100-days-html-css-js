const rateIcon = document.getElementById('icon-rate');
const ChildList = Array.from(rateIcon.children);

ChildList.forEach((child) => {
    child.addEventListener('click', () => {
        let elIndex = ChildList.findIndex(a => a === child)
        if (child.classList.contains('fa-regular')) {
            ChildList.slice(0,elIndex + 1).forEach(el => {
            el.classList.replace('fa-regular','fa-solid') 
            })

        } else {
            ChildList.slice(elIndex + 1).forEach(el => {
                el.classList.replace('fa-solid','fa-regular')
            })
        }
    })
})

