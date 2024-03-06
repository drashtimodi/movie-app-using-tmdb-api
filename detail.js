const apiKey = "dba24ff1d8d2f17372beed376e9b7a57";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmEyNGZmMWQ4ZDJmMTczNzJiZWVkMzc2ZTliN2E1NyIsInN1YiI6IjY1YTIzOWNiMjM4NTEzMDEyYjYyNTg2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9SO1t7bi2KObBaXRSGyMs0LTSeKWbNbM-UCzjZJFfgc'
    }
};

// const total = pages();

// function pages() {
//     for (let page = 1; page < 10; page++) {

//         console.log(movies);
//     }
// }

const top1 = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&include_adult=false&sort_by=popularity.desc`;
const pop = `https://api.themoviedb.org/3/movie/popular?language=en-US&include_adult=false&sort_by=popularity.desc`;
const trending = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&include_adult=false&sort_by=popularity.desc`;
const all = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&include_adult=false&sort_by=popularity.desc`;
// const page = 1;
// const movies = `https://api.themoviedb.org/3/discover/movie`;






fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=7&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        // console.log(response);
        const randomIndex = Math.floor(Math.random() * response.results.length);

        const mId = response.results[randomIndex].id;
        console.log(` random id = ${mId}`)

        const post = document.querySelector(".poster-details");
        const button = document.createElement('div');
        button.className = 'button'
        button.innerHTML = `<button class="my-list" onclick= showMovie(${mId})><i class="fa fa-info" style="margin-right: 10px;"></i>More Info</button>`;
        post.appendChild(button)
            // const infoBtn = document.querySelector(".my-list");
            // infoBtn.addEventListener("click", showMovie(mId));

        const movieTitle = response.results[randomIndex].title
        document.querySelector(".title h1").textContent = movieTitle;

        const movieGenere = response.results[randomIndex].genre_ids;
        movieGenere.map(el => {
            console.log(el);
            fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
                .then(response => response.json())
                .then(response => {
                    // console.log(response);
                    response.genres.map(genre => {
                        const { id, name } = genre
                        // console.log(id, name);
                        if (el == id) {
                            const ge = document.querySelector(".genere")
                            let g = document.createElement("span");
                            g.innerText = `${ name}`;
                            ge.appendChild(g);
                            // console.log(`movie id is ${el} and genres id is ${id} and its a ${name} its a match `)
                        }


                    })
                })
                .catch(err => console.error(err));
        })




        const movieOverview = response.results[randomIndex].overview
        document.querySelector(".title-info").textContent = movieOverview;

        const movieBackdrop = response.results[randomIndex].backdrop_path;

        const backdropUrl = `https://images.tmdb.org/t/p/original/` + movieBackdrop;
        document.querySelector(".image").src = `${backdropUrl}`;


    })
    .catch(err => console.error(err));





// top rated


async function displayMovies(url, head) {
    

    for (let page = 6; page <= 10; page++) {
       await fetch(`${url}&page=${page}`, options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)

const main = document.querySelector(`main`);

    const sec = document.createElement("section")

    const trend = document.createElement(`div`);
    trend.className = `trend`;
    trend.innerHTML = `<div class="trend-text">
                        ${head}
                    </div>`
    const tre = document.createElement(`div`);
    tre.className = `trend-1`
    sec.appendChild(trend);
    main.appendChild(sec);
    trend.appendChild(tre);
                response.results.forEach(element => {
                    if (element.poster_path != null) {
                        const movieTitle = element.title;
                        const rate = element.vote_average;

                        const rating = Math.round(element.vote_average, 2);
                        const releaseDate = element.release_date
                        const movieGenere = element.genre_ids;
                        const backdropUrl = `https://images.tmdb.org/t/p/original/` + element.poster_path;
                        // console.log(backdropUrl);

                        const image = document.createElement(`div`);
                        image.className = `image-card`;
                        image.innerHTML = `<img onclick="showMovie(${element.id})" src=${backdropUrl} title=${movieTitle}>`


                        tre.appendChild(image);

                    }



                });
                page++



            })
            .catch(err => console.error(err));
    }

}


async function categories(head, id) {
    

    for (let page = 2; page < 10; page++) {
       await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&sort_by=popularity.desc`, options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
const main = document.querySelector(`main`);

    const sec = document.createElement("section")

    const trend = document.createElement(`div`);
    trend.className = `trend`;
    trend.innerHTML = `<div class="trend-text">
                        ${head}
                    </div>`
    const tre = document.createElement(`div`);
    tre.className = `trend-1`
    sec.appendChild(trend);
    main.appendChild(sec);
    trend.appendChild(tre);
                response.results.forEach(element => {
                    if (element.poster_path != null) {
                        const movieTitle = element.title;
                        const rate = element.vote_average;
                        const rating = Math.round(element.vote_average);
                        const releaseDate = element.release_date
                        const movieGenere = element.genre_ids;
                        movieGenere.forEach(e => {
                            if (e == id) {
                                const backdropUrl = `https://images.tmdb.org/t/p/original/` + element.poster_path;
                                // console.log(backdropUrl);

                                const image = document.createElement(`div`);
                                image.className = `image-card`;
                                image.innerHTML = `<img onclick="showMovie(${element.id})" src=${backdropUrl} title=${movieTitle}>`


                                tre.appendChild(image);
                            }
                        })


                    }



                });
                page++


            })
            .catch(err => console.error(err));

    }


}
displayMovies(top1, `Top-Rated`);
displayMovies(pop, `Popular`);
displayMovies(trending, `Trending`);
displayMovies(all, `All`);

categories(`Comedy`, 35);
categories(`Horror`, 27);
categories(`Romantic`, 10749);
categories(`Crime`, 80);
categories(`Fiction`, 878);
categories(`Mystery`, 9648);


async function names(head, id, id1) {
    const main = document.querySelector(`main`);


    for (let page = 2; page < 30; page++) {
       await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&sort_by=popularity.desc`, options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)


    const sec = document.createElement("section")

    const trend = document.createElement(`div`);
    trend.className = `trend`;
    trend.innerHTML = `<div class="trend-text">
                        ${head}
                    </div>`
    const tre = document.createElement(`div`);
    tre.className = `trend-1`
    sec.appendChild(trend);
    main.appendChild(sec);
    trend.appendChild(tre);
                response.results.forEach(element => {
                    if (element.poster_path != null) {
                        const movieTitle = element.title;
                        const rate = element.vote_average;
                        const rating = Math.round(element.vote_average);
                        const releaseDate = element.release_date
                        const movieGenere = element.genre_ids;
                        movieGenere.forEach(e => {
                            if (e == id && id1) {
                                const backdropUrl = `https://images.tmdb.org/t/p/original/` + element.poster_path;
                                // console.log(backdropUrl);

                                const image = document.createElement(`div`);
                                image.className = `image-card`;
                                image.innerHTML = `<img onclick="showMovie(${element.id})" src=${backdropUrl} title=${movieTitle}>`


                                tre.appendChild(image);
                            }
                        })


                    }



                });
                page++


            })
            .catch(err => console.error(err));

    }


}
names(`Action & Thriller`, 28, 53)
names(`Adventure & Animation`, 12, 16)


// Display details
function showMovie(movieId) {
    window.location.href = `movie-details.html?id=${movieId}`
        // alert(window.location.href)
}
