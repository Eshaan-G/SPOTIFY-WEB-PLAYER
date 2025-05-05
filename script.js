console.log('Lets write javascript')

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/PROJECT-SPOTIFY/bb/");
    let response = await a.text();  // ← fix here
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let fileName = element.href.split("/").pop(); // Get last segment of the URL
            let decodedName = decodeURIComponent(fileName).replace(".mp3", "");
            songs.push(decodedName);
        }
    }
    return songs 
}

async function main() {
    let songs = await getSongs()
    console.log(songs)


    let songUL = document.querySelector(".songLists").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        
                            <img class="invert  " src="music.svg" alt="">
                            <div class="songinfo">
                                <div> ${song}</div>
                                <div>Eshaan</div>
                            </div>
                            <div class="playnow ">
                                <span>Play Now</span>
                                <img src="play2.svg" alt="">
                            </div>
       </li>`;
    }

    var audio = new Audio(`bb/${songs[0]}.mp3`);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    });

    console.log(songs[0])
}
main()
