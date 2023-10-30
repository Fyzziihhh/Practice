const url = "https://newsapi.org/v2/everything?q="
const API_KEY = "7c7f2a5dd1be4d7cb57d64e16170d25c"

window.addEventListener("load", fetchNews("india"))

function reload() {
    window.location.reload()
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    console.log(data.articles)
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById("container")
    const newsTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = ""

    articles.forEach(article => {
        if (!article.urlToImage) return

        const cardClone = newsTemplate.content.cloneNode(true)
        fillDataToCards(cardClone, article)
        cardsContainer.appendChild(cardClone)
    });
}
function fillDataToCards(cardClone, article) {
    newsImg = cardClone.getElementById("news-img")
    newsTitle = cardClone.getElementById("news-title")
    newsSource = cardClone.getElementById("news-source")
    newsDesc = cardClone.getElementById("news-desc")


    newsImg.src = article.urlToImage
    newsTitle.innerHTML = article.title
    const Newdate = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} : ${Newdate} `
    newsDesc.innerHTML = article.description

    cardClone.firstElementChild.addEventListener("click", () => window.open(article.url, "_blank"))
}
let curSelectedNav = null;
function onNavQuerys(id) {
    fetchNews(id)

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener("click", () => {
    console.log("hello");
    const query = searchBar.value
    if (!query) return
    fetchNews(query)
})