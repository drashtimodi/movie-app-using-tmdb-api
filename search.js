const url = `https://api.themoviedb.org/3/search/movie?query=`
const key = `dba24ff1d8d2f17372beed376e9b7a57`
    //    const key = https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=dba24ff1d8d2f17372beed376e9b7a57
const inputBox = document.querySelector("#search-input");
const search = document.querySelector("#search");
const body = document.querySelector("body")

async function searchMovie(title) {
    newSearch()

    const response = await fetch(url + title + `&api_key=${key}`);
    // console.log(response.json());
    var data = await response.json();
    // console.log(data);

    const main = document.createElement("main");
    const section = document.createElement("section");
    const tre = document.createElement("div");
    tre.className = `trend`;
    const trend = document.createElement("div");
    trend.className = "trend-1"
    trend.style.display = "flex";
    trend.style.flexWrap = "wrap";
    // trend.style.gap = "30px";
    trend.style.justifyContent = "center";
    trend.style.marginTop = "70px";

    tre.appendChild(trend);

    section.appendChild(tre);
    main.appendChild(section);
    body.appendChild(main);

    if (data.total_results != 0) {
        data.results.forEach(element => {

            const movieTitle = element.title

            const movieBackdrop = element.poster_path;
            const backdropUrl = `https://images.tmdb.org/t/p/original/` + movieBackdrop;
            if (movieBackdrop != null) {
                let card = document.createElement("div");
                card.className = "image-card"
                card.innerHTML = `<img  src="${backdropUrl}" alt="${movieTitle}">`


                card.addEventListener('click', () => showMovie(element.id))

                trend.appendChild(card);
            }



        });
    } else {
        const h = document.createElement("h2");
        h.innerText = `No such movies`;
        h.style.fontFamily = "arial";
        h.style.fontSize = "50px";
        trend.appendChild(h);
    }
}

function newSearch() {
    const dele = document.querySelectorAll("main");
    dele.forEach((el) => {
        el.style.display = "none";
    })
    inputBox.value = "";
}


search.addEventListener("click", () => {

    if (inputBox.value == "") {
        console.log(`write something`)
    } else {
        searchMovie(inputBox.value);
        // newSearch()

    }

})

// movie details page
function showMovie(movieId) {
    window.location.href = `movie-details.html?id=${movieId}`
}