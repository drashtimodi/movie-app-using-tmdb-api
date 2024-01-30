function getMovieTitleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const movieId = getMovieTitleFromUrl();

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmEyNGZmMWQ4ZDJmMTczNzJiZWVkMzc2ZTliN2E1NyIsInN1YiI6IjY1YTIzOWNiMjM4NTEzMDEyYjYyNTg2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9SO1t7bi2KObBaXRSGyMs0LTSeKWbNbM-UCzjZJFfgc'
    }
};
async function fetchMovieDetails() {


    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then(response => response.json())
        .then(response => {
                console.log(response);
                const poster = document.querySelector('.poster');
                poster.innerHTML = `<div class="image">
                <img src="${`https://images.tmdb.org/t/p/original/`+ response.backdrop_path}" class="image-1" width="400px" height="500px">
            </div>
            <div class="details" style="display: flex;">
                <div class="poster-details">
                    <div class="title">
                        Title : <span id="title">${response.title}</span>
                    </div>
                    <div class="title-inform">
                        Overview : <span id="title-info">${response.overview}</span>
                    </div>
                    <div class="genere">
                        Genres : 
                    </div>
                    <div class="rating">
                        Rating : <span id="rating">${Math.round(response.vote_average)}<sup><i class="fa fa-star"></i></sup></span>
                    </div>
                    <div class="r-date">
                        Release Date : <span id="r-date">${response.release_date}</span>
                    </div>
                    <div class="status">
                        Status : <span id="status">${response.status}</span>
                    </div>
                    <div class="btn">
                        <button class="btn-b" onclick="videoDetails()">Watch Trailer</button>
                    </div>

                </div>

            </div>`
            response.genres.forEach(element => {
                const genre = document.querySelector(".genere");
                const span = document.createElement("span");
                span.id="genere"
                span.innerText = `${element.name}`
                genre.appendChild(span);
            });

        })
        .catch(err => console.error(err));
}

function videoDetails() {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        const videoFrame = document.querySelector(".trailer");
        const frame = document.createElement("iframe")
        videoFrame.appendChild(frame)
        
        for(let i=0; i< response.results.length; i++){
            if (response.results[i].type == "Trailer") {
                console.log(response.results[i])

                // const videoFrame = document.querySelector(".trailer");
                // const frame = document.createElement("iframe")
                frame.src=`https://www.youtube.com/embed/${response.results[i].key}`;
                
                // videoFrame.appendChild(frame)
            }
            else if (response.results[i].type == "teaser" || 'Teaser') {
                frame.src=`https://www.youtube.com/embed/${response.results[i].key}`;
                
            }
            
        }
        
        
    })
    .catch(err => console.error(err));
    
}

document.addEventListener('DOMContentLoaded', fetchMovieDetails);