// fetching data from server
const fetchData = artist => {
    fetch(`https://api.lyrics.ovh/suggest/${artist}`)
    .then(response => response.json())
    .then(serverData => showData(serverData));
}

// collecting data and displaying to web page
const showData = serverData => {
        const dataArray = serverData.data;
        document.getElementById('search-value').value = '';
        document.querySelector('.search-result').innerHTML = '';

        for (let i = 0; i < dataArray.length; i++) {
            if(i === 10){
                break;
            }

            const albumImage = dataArray[i].album.cover_medium;
            const songName = dataArray[i].title;
            const albumName = dataArray[i].album.title;
            const artistName = dataArray[i].artist.name;

            document.querySelector('.search-result').innerHTML += 
            `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-3">
                    <img class="w-50 h-50 album-img rounded-circle d-block mx-auto" src=${albumImage} alt="">
                </div>
                <div class="col-md-6 text-center">
                    <h3>${songName}</h3>
                    <h5 class="text-center">Album: <span class="lead">${albumName}</span> </h5>
                    <h5 class="text-center">Artist: <span class="lead">${artistName}</span></h5>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success get-lyrics">Get Lyrics</button>
                </div>
                <div class="lyrics-box container text-center mt-5">
                    <h2 class="text-success mb-4 song-title"></h2>
                    <pre class="single-lyrics text-white">
                        
                    </pre>
                    <button class="btn btn-danger go-back">Collapse</button>
                </div>
            </div>` ;

            // fetch and show lyrics
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
            .then(response => response.json())
            .then(lyricData => {
                document.getElementsByClassName('song-title')[i].innerHTML = songName;
                if(lyricData.lyrics){
                    document.getElementsByClassName('single-lyrics')[i].innerHTML = lyricData.lyrics;
                }
                else{
                    document.getElementsByClassName('single-lyrics')[i].innerHTML = lyricData.error;
                }
                document.getElementsByClassName('lyrics-box')[i].style.display = 'none';
            })
        }

        for(let i = 0; i < 10 ; i++){
            // get lyrics click handler
            document.getElementsByClassName('get-lyrics')[i].addEventListener('click', () => {
                document.getElementsByClassName('lyrics-box')[i].style.display = 'block';
            })
            // collapse button click handler
            document.getElementsByClassName('go-back')[i].addEventListener('click', () => {
                document.getElementsByClassName('lyrics-box')[i].style.display = 'none';
            })
        }
}

// search button click handler
document.querySelector('.search-btn').addEventListener('click', () => {
    const artist = document.getElementById('search-value').value;
    fetchData(artist);   
})

