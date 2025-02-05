console.log('we r starting');

let currentsong=new Audio()
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


async function getsongs(){
    let a= await fetch("http://127.0.0.1:5500/songs/");
    let response=await a.text();
    // console.log(response);
    let div= document.createElement("div")
    div.innerHTML=response
    let as= div.getElementsByTagName("a")
    // console.log(as);
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith("mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
    return songs
    
}

const playfn=(track, paue=false)=>{
    console.log(track)
    currentsong.src="/songs/" +track
    if(!paue){

        currentsong.play()
       
        pause.src="pause.svg"
    }

    document.querySelector(".songinfo").innerHTML=`${decodeURI(track)}`

    // document.querySelector(".songtime").innerHTML=`${currentsong.duration}`

}

// const buttonfn=(element)=>{

// }

async function main(){
        
    songs=await getsongs()
        playfn(songs[0],true)
        console.log(songs);

        let songul= document.querySelector(".songslist").getElementsByTagName("ul")[0]
        for (const song of songs) {
            songul.innerHTML=songul.innerHTML+
            ` 
            <li>
                            <img src="music.svg" alt="" class="invert">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>song artist</div>
                            </div>
                            <div class="playnow">
                                <div>play now</div>
                                <img class="invert" src="play.svg" alt="play">
                            </div>
            </li> `
        }
        // var audio=new Audio(songs[0]);
        // // audio.play();     
        
        // audio.addEventListener("loadeddata",()=>{
        //     // let duration=audio.duration;
        //     console.log(audio.duration, audio.currentTime, audio.currentSrc)
        // })

        let one=document.querySelector(".songslist").getElementsByTagName("li")


        Array.from(one).forEach(element => {
            element.addEventListener("click", e=>{
                playfn(element.querySelector(".info").firstElementChild.innerHTML)
            })
        })

        //attaching event listener to play next and prev buttons
        // let buttons=document.querySelector(".songbuttons")
        // Array.from(buttons).forEach(element => {
        //     element.addEventListener("click" , e=>{
        //         buttonfn(element)
        //     })
        // });


        pause.addEventListener("click",()=>{
            if(currentsong.paused){
                currentsong.play()
                pause.src="pause.svg"
            }
            else{
                currentsong.pause()
                pause.src="play.svg"
            }
        } )
            
        currentsong.addEventListener("timeupdate", ()=>{
            document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}/ ${secondsToMinutesSeconds(currentsong.duration)}`

            document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration) *100 +"%"
        })


        document.querySelector(".seekbar").addEventListener("click",(e)=>{

            let percent=(e.offsetX/e.target.getBoundingClientRect().width) *100
            document.querySelector(".circle").style.left=percent +"%"
            currentsong.currentTime=(currentsong.duration * percent)/100


        })
        
        ham.addEventListener("click",()=>{
            document.querySelector(".left").style.left="0"
        })

        cross.addEventListener("click",()=>{
            document.querySelector(".left").style.left="-100%"
        })

        // document.querySelectorAll(".box1").addEventListener("hover",()=>{
        //     document.querySelectorAll(".play").style.zindex="3"
        // })

        //adding event listeners to next aand prev
        prev.addEventListener("click",()=>{
            
            let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
           
                if(index>0){
                    playfn(songs[index-1])
                }
        })
        next.addEventListener("click",()=>{
            let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
            console.log(index);
            if((index+1)<songs.length){
                playfn(songs[index+1])
            }
        })

        document.querySelector(".vol").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
            currentsong.volume=parseInt(e.target.value)/100
            console.log(currentsong.volume)
            if(!currentsong.volume){
                volume.src="mute.svg"
            }
            else{

                volume.src="volume.svg"
            }

            
        })

    }

main();