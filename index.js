let genreFilter = document.getElementById('genre-filter')
let lastSong = document.getElementById('backward-btn')
let nextSong = document.getElementById('forward-btn')
let searchResult = document.getElementById('search-result')

// Refresh page

let navImage = document.querySelector('.nav-image')
let navTitle = document.querySelector('.nav-title')

navImage.addEventListener('click',refreshbtn)
navTitle.addEventListener('click',refreshbtn)

function refreshbtn(){
  window.location.reload()

}

// Next song & last Song Play
let currentIndex = 0;
function playSong(index){
  document.getElementById('song-title').innerText = songsList[index].title;
  document.getElementById('artist-name').innerText = songsList[index].artist;
  document.getElementById('audio-source').src = songsList[index].audio;
  document.getElementById('cover-image').src = songsList[index].artistImage;
  document.getElementById('audio-player').load();
  document.getElementById('audio-player').play();
}

// Next song & last Song Play 
nextSong.addEventListener('click',()=>{
  currentIndex++
  if(currentIndex >= songsList.length){
    currentIndex = 0;
  }
  playSong(currentIndex);
})

lastSong.addEventListener('click',()=>{
  currentIndex--;
  if(currentIndex<0){
    currentIndex = songsList.length - 1;
  }
  playSong(currentIndex);
})

// Show Song function
let songList = document.getElementById('song-list')

function showSongs(song){
  const button = document.createElement('button')
  button.textContent = `${song.title} - ${song.artist}`
  button.classList.add('song-item',song.genre)
  songList.append(button)

  button.addEventListener('click',()=>renderCurrentSong(song))
}


// Render Current Song
function renderCurrentSong(song){
  document.getElementById('song-title').innerText = song.title;
  document.getElementById('artist-name').innerText = song.artist;
  document.getElementById('audio-source').src = song.audio;
  document.getElementById('cover-image').src = song.artistImage;
  document.getElementById('audio-player').load();
  document.getElementById('audio-player').play();
  searchResult.innerHTML = `Playing Song: ${song.title}`
}

// filter by song genre 
function filterSongs(){
  let genreValue = genreFilter.value
  let songItems = document.querySelectorAll('.song-item')

  songItems.forEach(song =>{
    if(genreValue === 'all' || song.classList.contains(genreValue)){
      song.style.display = 'block'
    } else {
      song.style.display = 'none'
    }
  })
}
genreFilter.addEventListener('change',filterSongs)

// Create Playlist
let playlistNameInput = document.getElementById('playlist-name') //Playlist input
let createPlaylistBtn = document.getElementById('Create-playlist-btn') // Playlist input btn
let allPlaylists = document.getElementById('all-playlists')
let currentPlaylist = document.getElementById('current-playlist')


let playlists = {};
let selectplaylistName;

// Create playlist function
createPlaylistBtn.addEventListener('click',createPlaylist)

function createPlaylist(){
  let playlistName = playlistNameInput.value.trim()
  if(playlistName){
    if(playlists[playlistName]){
      alert(`This "${playlistName}" playlist is already Created`)
      playlistNameInput.value = ''
      return;
    }
    
    playlists[playlistName] = []
    selectplaylistName = playlistName;

    let newPlaylist =  document.createElement('button')
    newPlaylist.classList.add('playlist')
    newPlaylist.innerHTML = playlistName;
    newPlaylist.addEventListener('click',()=>{
      selectplaylistName = playlistName;
      renderPlaylistSong();
    })
    let deletePlaylist = document.createElement('span')
    deletePlaylist.classList.add('delete-playlist')
    deletePlaylist.innerText = 'x'

    deletePlaylist.addEventListener('click',()=>{
      deletePlaylistSong(playlistName,li)
    })
    
    let li = document.createElement('li')
    li.classList.add('playlist-items')
    li.append(newPlaylist,deletePlaylist)
    allPlaylists.append(li)  
    playlistNameInput.value = ''

  }
}

// Delete playlist function
function deletePlaylistSong(playlistName,playlistElement){
  delete playlists[playlistName];

  playlistElement.remove()

  if(selectplaylistName === playlistName){
    currentPlaylist.textContent = ''
  }
}

// Add To Playlist Button 
let addPlaylistBtn = document.getElementById('add-playlist-btn')

addPlaylistBtn.addEventListener('click',addToPlaylist)

// Add to playlist function

function addToPlaylist(){
      if(selectplaylistName){
        let songTitle = document.getElementById('song-title').innerText
        let songArtist = document.getElementById('artist-name').innerText
        let song = `${songTitle} - ${songArtist}`
        
        if(!playlists[selectplaylistName].includes(song)){
          playlists[selectplaylistName].push(song)
          renderPlaylistSong()
        } else {
          alert('This song is already in the playlist!')
        }
      }
}

// Show Playlist song function

function renderPlaylistSong(){
  currentPlaylist.innerHTML = '';

  playlists[selectplaylistName].forEach((song,index)=>{

    let button = document.createElement('button')
    button.classList.add('song-list')
    button.innerHTML = song;

// Click event created on that song which is added to playlist
    button.addEventListener('click',()=>{
      let [songTitle, songArtist] = song.split('-').map(s=>s.trim())
      let songDetails = songsList.find(s =>s.title == songTitle && s.artist == songArtist);
      console.log(songDetails)
      if(songDetails){
        renderCurrentSong(songDetails)
      }
    })

    let li = document.createElement('li')
    li.appendChild(button)
    currentPlaylist.appendChild(li)


    // Remove Button 
    let removeBtn = document.createElement('span')
    removeBtn.classList.add('remove-playlist')
    removeBtn.textContent = 'x'
    
    removeBtn.addEventListener('click',()=>{
      deleteSong(index)
    })
    li.appendChild(removeBtn)
  })
}

function deleteSong(songIndex){
  playlists[selectplaylistName].splice(songIndex, 1);
  renderPlaylistSong();
}

// Search for a particular playlist
let searchInputPlaylist = document.getElementById('search-input-playlist')

searchInputPlaylist.addEventListener('input',searchPlaylist)

function searchPlaylist(){
  let searchQuery = searchInputPlaylist.value.toLowerCase();
  let playlistItems = document.querySelectorAll('.playlist-items')

  playlistItems.forEach(items=>{
    let playlistNames = items.querySelector('button.playlist').innerHTML.toLowerCase()
    if(playlistNames.includes(searchQuery)){
      items.style.display = '';
    } else {
      items.style.display = 'none';
    }
  })

}


// object of songs 
let songsList = [
  {
    id:1,  
    title:'Despacito',
    artist:'Luis Fonsi',
    audio:'song/Despacito.mp3',
    artistImage:'artist/Luis Fonsi.jpg',
    genre:'english'
  },
  {
    id:2,
    title:'Duniyaa',
    artist:'Akhil and Dhvani Bhanushali',
    audio:'song/Duniyaa.mp3',
    artistImage:'artist/duniya.jpg',
    genre:'love'
  },
  {
    id:3,
    title:'Friends',
    artist:'Anne Marie and Marshmello',
    audio:'song/Friends.mp3',
    artistImage:'artist/friends.jpg',
    genre:'english'
  },
  {
    id:4,
    title:'Tera Yaar Hoon Main',
    artist:'Arjit Singh',
    audio:'song/TeraYaarHoonMain.mp3',
    artistImage:'artist/arjit singh.jpg',
    genre:'love'
  },
  {
    id:5,
    title:'Once In A Lifetime',
    artist:'Talking Heads',
    audio:'song/OnceInALifetime.mp3',
    artistImage:'artist/once in a life.jpg',
    genre:'party'
  },
  {
    id:6,
    title:'Party All Night',
    artist:'Honey Singh',
    audio:'song/PartyAllNight.mp3',
    artistImage:'artist/honey singh.jpg',
    genre:'party'
  },
  {
    id:7,
    title:'Teri Meri Kahaani',
    artist:'Arjit Singh',
    audio:'song/TeriMeriKahaani.mp3',
    artistImage:'artist/arjit singh.jpg',
    genre:'love'
  }
]


// Search By Song Name
let searchContentDetails = document.getElementById('search-content-details')
let searchItem1 = document.getElementById('search-item')

searchItem1.addEventListener('click',seacrhSong)
function seacrhSong(){
  let searchInput = document.getElementById('search-input').value
  let inputValue = searchInput.trim().toLowerCase()
  if(inputValue){
    const song = songsList.find(song=>song.title.toLowerCase().includes(inputValue))
    if(song){
      searchContentDetails.style.display = ' block'
      
      let li = document.createElement('li')
      let button = document.createElement('button')
    
      button.addEventListener('click',()=>renderCurrentSong(song))
      
      li.append(button)
      searchContentDetails.append(li)

      button.textContent =  `${song.title} - ${song.artist}`
      document.getElementById('search-input').value = ''

      // search song refresh
      li.addEventListener('mouseout',()=>{
        setTimeout(()=>{
          li.remove()
          searchContentDetails.style.display = 'none'
        },5000)
      })
      
    }
    else {
      alert(`${searchInput}: not Found`)
      document.getElementById('search-input').value = ''
    }  
  }
}


// Dark mode 
  let body = document.getElementsByTagName('body')[0]
  let darkMode = document.getElementById('dark-mode')

  darkMode.addEventListener('click',toggleTheme)

// Dark mode Function 
    function toggleTheme(){
      darkMode.classList.toggle('active')
      body.classList.toggle('dark-mode')
    }

// Song List creater 
songsList.forEach(song =>showSongs(song))

