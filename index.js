
const accessKey = 'hfbU7yiYY5nmdKERQf1g1NZT-LM7hIzX5iW-9mDmL3E'

const searchForm = document.querySelector('form')
const imageContainer = document.querySelector('.images-container')
const inputSearch = document.querySelector('.inputSearch')
const loadMoreBtn = document.querySelector('.loadMoreBtn')

let page;
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.value;
    const inptTxt = inputSearch.value.trim();
    if (inptTxt !== '') {
        page = 1;

        fetchImages(inptTxt, page);
    } else {
        imageContainer.innerHTML = ` <h2> Please enter a seach query..</h2>`
    }

})

const fetchImages = async (query, pageNo) => {
    if (pageNo === 1) {
        imageContainer.innerHTML = ''
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    data.results.forEach(photo => {
        const imageElement = document.createElement('div')
        imageElement.classList.add('imageDiv')
        imageElement.innerHTML = `<img src = "${photo.urls.regular}"/>`

        //Overlay
        const overlayElement = document.createElement('div')
        overlayElement.classList.add('overlay')

        //Overlay Button

        const overlayTxt = document.createElement('a')
        overlayTxt.innerText = "Download"
        overlayTxt.href = `${photo.urls.regular} `
        overlayTxt.target = "_blank"
        overlayTxt.classList.add('overlayTxt')

        overlayElement.appendChild(overlayTxt)
        imageElement.appendChild(overlayElement)
        imageContainer.appendChild(imageElement)
    });
    if (data.total_pages === pageNo) {
        loadMoreBtn.style.display = 'none'
    }
    else {
        loadMoreBtn.style.display = 'block'
    }
}
loadMoreBtn.addEventListener('click', () => {
    fetchImages(inputSearch.value.trim(), ++page)
})