for (let i = 0; i < 5; i++) {
    getArticles(i);
    document.querySelector(".inqueue-article-container").innerHTML += `
    <div class="inqueue-article">
        <img class="inqueue-article-image" src="./images/background1.png" alt="article-image">
        <div class="inqueue-tag">
            <p id="tag${i}">Did you know?</p>
        </div>
        <h2 id="title${i}">Did you know? Laughing is good for the heart and can increase blood flow by 20 percent.</h2>
    </div>
    `;
}


function getArticles(number){
    fetch("./article.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.articles[number].id);
        
        document.getElementById(`tag${number}`).innerHTML = data.articles[number].tag;
        document.getElementById(`title${number}`).innerHTML = data.articles[number].title;

      });
}