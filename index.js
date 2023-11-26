
let songIndex = 0;
let masterPlay= document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif')
let backward = document.getElementById('backward')
let forward = document.getElementById('forward')
let songList = Array.from(document.getElementsByClassName('songItem'))
let menuSongPlayHandler = Array.from(document.getElementsByClassName('songPlayItem'))
let audioElement  = new Audio('song/1.mp3');



let songs = [
    {songName:'Lutt Putt Gaya', filePath:'song/1.mp3',coverPath:'cover/1.jpg'},
    {songName:'Kudiye Ni Tere', filePath:'song/2.mp3',coverPath:'cover/2.jpg'},
    {songName:'Badhte Chalo', filePath:'song/3.mp3',coverPath:'cover/3.jpg'},
    {songName:' Sunoh', filePath:'song/4.mp3',coverPath:'cover/4.jpg'},
]

songList.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})



// Audio Element Play

// Handle play/pause  click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.src = '/assest/pause.png'
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause()
        masterPlay.src = '/assest/PlayIcon.png'
        gif.style.opacity = 0;
    }
})


// Listen to Event
audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar
    Progress = parseInt((audioElement.currentTime/audioElement.duration)*100)    
    myProgressBar.value = Progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})




// Main Menu
function makeAllPlay(){
    menuSongPlayHandler.forEach((element,i)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}



menuSongPlayHandler.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        index = parseInt(e.target.id)
        console.log(e.target.classList);
        gif.style.opacity = 1;        
        makeAllPlay();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${index}.mp3`;
        audioElement.play();
        masterPlay.src = ``
    })
})

backward.addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    
    
    audioElement.src = `song/${songIndex +1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle')

})

forward.addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
        
    }
    else{
        songIndex -=1;
        
    }
    console.log(songIndex)
    
    
    audioElement.src = `song/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src ='/assest/pause.png'

})

