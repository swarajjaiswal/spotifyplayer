console.log("Jvascript");

let currentSong = new Audio();
let currFolder;
let songs

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
  currFolder = folder
  let a = await fetch(`/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = " "
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
  <img class="invert"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA9VJREFUWEedmE+IjkEcxz/jz1oHKbQpW1IuSpK9oGQPhCT5V+K2V/8uSJR933BApIgLRRtbW1IOkqQc5KB1kbJyUJusfzloD8iOZ+aZ931mnmfmmdl9T+8785uZ73x/39/39zyvYCofAcipLAQqa90B9SvyMQuSQQgE0sUbAqHHkwDZQclIzMUi8QnTHoZqV10EjgLvgNvAHRBjFVYqu9rMhVkPpMzDUDH0G0FHOyc5kmfAXQRDSMY1lskSa/HrZUif49+0Ts4KzANgAHgKTBRbhGVQnkkTdRElrdt/Bbq8Gwg+IxnUzMHrWOm05p2U2aIvvldoMgxpTcyQsAHYJ2CHhDmBg9+AGACpmBury2cOKJRvf7naDClU2pMEdErYpsABW4BZnq0nQOttQMB9idFb+xb5dtZPn9+FGTIm4iNlLoI9SM1cb4634jc/pWAdkrcJGqo1Q1vU3iotXWGhYU2B63EqQnACyXk7S4GyD0lQH+UBFM55yZ+WAldBbDbjzeykRjlLqQXQinMB2ZWQspOgkTlKvwktAXI05Lll3IeiDHvqQgMy43WAatNkT0Y0FLVolaIAoFz6lmnn9aAs2uR4cdarlgDfEYwg+Vt68Igy5KliDcgIuZlZRpKGlgFngJ3Kpcydx0FcAnnaquAwoLACCkCQlLJe4JGA2cGm5dp4ipTtmAaIfrvKCuwlYwTmZZ7xPivN+ZVTyu6VozUMRXTjrq0RdWvD4sYXEBwLtfkySGW/LRZd0mqfbysps50j10dxg1EE3d7nZY/f2IBiDci6jE6ZaVJRDf0BZk5CFK6oq6CnA2tMZX4Q8CXjrkbUTtnrHz9krqNW9fvfLvKDvwlkVzU5enJaZhUHgePAImuzF9pCYLvfqYuS1hAE8rGETW1AIWXnKX5obWxHKjBqbmsC0zpl5Xqx120EnriAgoayFnjp2Goeego4mwBGhTQzIhp2GqrGJhhEsrdd1C3zdk+4DhzwHLoAxCeQHflctI3Udfv24k7gJrDfOTCfVpK5ARwG/nkA9QG3EtkxDPlah/8iK837V7c5YAS4DIyU+p19/smsSs/ZAxGOVMU1HQ35F4QbUcUA3dAjwBU/QybQbGBaxyHgWvkCk2A4GrraFno0GnrKr0i5qG3wETGGUmCND2dlvyoBzHNANfKKVD1r3WOjteJUk1gOcrj1ul32GNOTf4FcAXysAeT+jRIHEeJAr1wPDAXeakeBXZlxvvLt4POhKfwZ5WVU2UefgN0SlHurPnnPvFqrJ0+vTVUB1SbfnwB37xRuwzGWqMOlniDQJGMuTghr9D9ROlE67QkfIwAAAABJRU5ErkJggg==" />
  <div class="info">
  <div>${song.replaceAll("%20", "")}</div>
      
  </div>
  <div class="playnow">
      <span>Play Now</span>
      <img class="invert"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAiBJREFUWEe1WFGywiAMXA7u6Ck8kMfxwyv0PSxtE7IJoWp/OoMQlt1kQy3onwJgkYNt4P0yP7aJ3riJPhyokb78EHAhXv3jCkiOfXzYgoJFkzxx5EmGZpH7EnugE4AmKMtMDXNxFYsmZiY2SX2jfygfITzFkAx6xMjI9xPJJjLSmzpBt8vQRIwx4olgCcn2/W4AngDuyiYIHCNmqC7zoUHQ5lW3f3u5AngAuLS3UxJj0viM6mHOQ1iuDFVA23NvwF67s6alsaxs3co6tX+4HlCd+WqgKjjK81Gh0sF95Ioh7ln74htQrl3n3UCsMhY8op7BYbRR8coJXrDlUJRxQsZ1WlpFYc90FTFAI5nTBYSMsTTqlqMA5ThiORStfADlAixVzjRbTpWRk70lc3PISnOEMDJWST7o9jsJB0OOVg4TFJBTHCi8WVIleA55YqwVZwxUiUeFEHuHZQnwHLKLHG8a3CQb6yKHhhWRSepOntmiVxc0LZMJFfoQ72+54mXNNXeQE61DQspsUlpSy7n+ur512Orx1uruYIjrt88yy68fZLNBcZwB5BkjngW4M8vPneqYFZGZi2WY0ERz583kjWyl7IKWi9EdYrBo4Ox96kfXCc7eKdC+EBKvaB25EuWt5iRCt3Vk4hHaM8vGaWwNmUrGv1YnLjZhqfg15kjWMj+Tq9/CKOLor5hMRTjau3+wESvkXyNbc51LBipG2H0m4v8BvIfpKqt8aiMAAAAASUVORK5CYII=" />
  </div></li>`;
  }

  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {

      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  })

  return songs;
}
const playMusic = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track
  if (!pause) {
    currentSong.play()
    play.src = "pause.svg"
  }

  document.querySelector(".songinfo").innerHTML = track
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}





async function main() {

  await getSongs("songs/sleep");
  playMusic(songs[0], true)



  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      play.src = "pause.svg"
    }
    else {
      currentSong.pause()
      play.src = "play.svg"
    }
  }
  )

  Array.from(document.getElementsByClassName("cards")).forEach(e => {
    e.addEventListener("click", async item => {
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0])
    })
  })

  currentSong.addEventListener("timeupdate", (params) => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    if (currentSong.currentTime == currentSong.duration) {
      play.src = "play.svg"
    }

  }
  )

  document.querySelector(".seekbar").addEventListener("click", e => {
    let yup = e.offsetX / e.target.getBoundingClientRect().width * 100
    document.querySelector(".circle").style.left = (yup) + "%"
    currentSong.currentTime = ((currentSong.duration) * yup) / 100;
  }
  )
  previous.addEventListener("click", () => {
    currentSong.pause()
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index - 1) >= 0) {
      playMusic(songs[index - 1])
    }
  })


  next.addEventListener("click", () => {
    currentSong.pause()
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index + 1) < songs.length) {
      playMusic(songs[index + 1])
    }
  })


  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {

    currentSong.volume = parseInt(e.target.value) / 100
  })

  if (currentSong.volume > 0) {
    document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
  }

  document.querySelector(".volume>img").addEventListener("click", e => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = e.target.src.replace("volume.svg", "mute.svg")
      currentSong.volume = 0;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
    }
    else {
      e.target.src = e.target.src.replace("mute.svg", "volume.svg")
      currentSong.volume = 1;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 100;
    }

  })


}

main();
