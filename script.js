const accessKey = "wJmVYmceybi_-isAWGgQzsKlKsvCTyxJWa5GvhuUmNc"; // unsplach API key

const formEl = document.querySelector("form"); // form kısmını değişkene atadık
const inputEl = document.getElementById("search-input"); // input kısmındaki veriyi bu değişkene atayacağız
const searchResults = document.querySelector(".search-results"); // Not: sınıf kullanıyorsak başına . yazmamız lazım querySelector ile.
const showMore = document.getElementById("show-more-button"); // ID kullandığımız için başına nokta koymaya gerek yok.

let inputData = ""; // arama için kullanılacak veriyi tutmak için 
let page = 1; // sayfa no

async function searchImages() { 
    inputData = inputEl.value; // Boş oluşturduğumuz inputData'yı fonksiyon içersinide inputEl'e eşitledik
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; // Burada url oluşturup verileri dinamik bir şekilde çektik

    const response = await fetch(url); // istek yolladık
    const data = await response.json();  // datayı json'a dönüştürdük 

    const results = data.results; // results özelliği API'den gelen sonuçları temsil ediyor

    if (page === 1) {
        searchResults.innerHTML = ""; // eğer page 1 ise içeriği temizliyoruz. Not: her yeni arama için.
    }

    results.map((result) => { // map yöntemi kullandık
        const imageWrapper = document.createElement('div'); // div nesnesi oluşturup eşitledik
        imageWrapper.classList.add("search-result");  // div'e search-result ekledik
        const image = document.createElement('img'); // img nesnesi oluşturduk
        image.src = result.urls.small;  
        image.alt = result.alt_description;
        const imageLink = document.createElement('a'); // a nesnesi oluşturduk
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.append(imageWrapper);
    });

    page++
    if (page > 1) {
        showMore.style.display = "block";
    }
}


formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => { // Eğer birden fazla sayfa varsa bunun için bir listener işlevi ekledik
    searchImages();
}) 