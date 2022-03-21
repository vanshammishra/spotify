console.log("Welcome To Spotify");
// initialize the variables
let songIndex = 0;
let audioELement = new Audio('songs/1.mp3');
let masterPlay  = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"salam-e-ishq", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"mere-mehboob", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"rabba-mere", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"rang-sharbatoon-ka", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"ishq-sufiyana", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
// audioELement.play();

// handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioELement.paused || audioELement.currentTime<=0){
        audioELement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioELement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//listen to events
audioELement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    
    //update the seek bar
    progress  = parseInt((audioELement.currentTime / audioELement.duration )*100);
    // console.log(progress);
    myProgressBar.value = progress; //this would set the progress
})

myProgressBar.addEventListener('change', ()=>{
    audioELement.currentTime = myProgressBar.value * audioELement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioELement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName; //get the name of the playing song from the song list
        audioELement.currentTime = 0;
        audioELement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

//play the next song
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioELement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;  //get the name of the playing song from the song list
    audioELement.currentTime = 0;
    audioELement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioELement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; //get the name of the playing song from the song list
    audioELement.currentTime = 0;
    audioELement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

