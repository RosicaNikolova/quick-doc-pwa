const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id)
getArticles(id);

function getArticles(number) {
  fetch("./article.json")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("article-img").src = data.articles[number].image;
      document.getElementById("article-title").innerHTML = data.articles[number].title;
      document.getElementById("article-text").innerHTML = data.articles[number].text;
    });
}