import { useRef,useEffect, useState } from 'react';
import not_found from '../utils/not-found.png'
import '../styles/audio.css';
import { useNavigate } from 'react-router-dom';


const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }



const Audio = (props) => {
    const [duration,setDuration] = useState("");
    const currentAudio = useRef();
    const [timeElasped,setTimeElasped] = useState(0);
    const [length,setLength] = useState(1);
    const [loop,setLoop] = useState(true);
    const navigation = useNavigate();
    
    

    useEffect(() => {
        try {
        if (currentAudio.current !== null) {
            
           
          if (!props.isPlaying && currentAudio.current.isPlaying) {
            currentAudio.current.pause();
          } else if(!currentAudio.current.isPlaying) {
            currentAudio.current.play();
          }
        }
        } catch(error) {
          console.error(error);
        }
      }, [props.isPlaying]);

  

    useEffect(() => {
      
        const timeIterval =  setInterval(() => {
            if(currentAudio.current !== null) {
                setLength(currentAudio.current.duration);
                setDuration(formatTime(currentAudio.current.currentTime));
                setTimeElasped(Math.floor((currentAudio.current.currentTime/currentAudio.current.duration)*100));
            }
        },1000)
       
    
        return () => {
          clearInterval(timeIterval);
        };
      }, []);

     

  
    return (

        <div className="audio">
            {props.track.url !== null ? <audio src={props.track.url} ref={currentAudio} onEnded={() => props.setIsplaying(false)} autoPlay></audio> : null}
           
            
            <div className="track">
                {props.track.cover !== null ? <img src={props.track.cover} alt="track"/> : <img src={not_found} alt="track"/>}
                <div className="details">
                    <p className="title" onClick={() => navigation(`../track/${props.track.key}`)}>{props.track.title}</p>
                    <p className="subtitle" onClick={() => navigation(`../search/${props.track.artist}`)}>{props.track.artist}</p>
                </div>

                
                <div className="process">
                  { props.track.url !== null ? (
                    <div>
                {duration}
                    <input type="range" min={0} max={100} step={1} value={timeElasped.toString()}   onChange = {(e) => {
                      setTimeElasped(e.target.value);
                      setDuration(formatTime(e.target.value*0.01*length));
                      props.setIsplaying(false); 
                      if(currentAudio.current !== null && isFinite(Math.floor(e.target.value*length*0.01))) {
                       currentAudio.current.currentTime = Math.floor(e.target.value*length*0.01)};
                      props.setIsplaying(true);
                      }}/>
                    {formatTime(length) !== "NaN:NaN" ? formatTime(length) : '...'} </div>) : (<h1>No source found</h1>)  
                   }
                </div>
                { props.track.url !== null ? (
                <div className="controls">
                  
                    <span className="material-symbols-outlined" onClick={() => {
                        if(currentAudio.current !== null) {
                        currentAudio.current.currentTime = 0}}} style={{fontSize: '25px',transform: 'translateY(-5px)'}}>replay</span>
                    <span className="material-symbols-outlined" onClick={() => {
                        if((props.nthAudio-1)%props.numberOfAudios>=0) {
                        props.setNthAudio((props.nthAudio-1)%props.numberOfAudios)} else {
                            props.setNthAudio(props.numberOfAudios-1)}

                        }
                        }>skip_previous</span>
                    {
                    props.isPlaying  ? (<span className="material-symbols-outlined" onClick={() => props.setIsplaying(false)}>pause</span>) :
                                (<span className="material-symbols-outlined"  onClick={() => props.setIsplaying(true)}>play_arrow</span>)
                    }
                    <span className="material-symbols-outlined" onClick={() => props.setNthAudio((props.nthAudio+1)%props.numberOfAudios)}>skip_next</span>
                    <span id="repeat-span" className="material-symbols-outlined" onClick={() => {
                      if(loop) {
                      currentAudio.current.loop = true;
                      document.getElementById("repeat-span").style.color = "yellow";
                      document.getElementById("repeat-span").addEventListener('mouseover',()=>{
                        document.getElementById("repeat-span").style.color = "yellow";
                      })
                      document.getElementById("repeat-span").addEventListener('mouseout',()=>{
                        document.getElementById("repeat-span").style.color = "yellow";
                      })
                      setLoop(false);

                    } else {
                      currentAudio.current.loop = false;
                      document.getElementById("repeat-span").style.color = "#fff";
                      document.getElementById("repeat-span").addEventListener('mouseover',()=>{
                        document.getElementById("repeat-span").style.color = "lime";
                      })
                      document.getElementById("repeat-span").addEventListener('mouseout',()=>{
                        document.getElementById("repeat-span").style.color = "#fff";
                      })
                      setLoop(true);

                      }  }}>repeat</span>
                      <span className="material-symbols-outlined" onClick={(e) => {e.preventDefault();window.location.href = props.track.url}}>download</span>
                    
                </div> ) : null
              }
            </div>
        </div>

    )
}

export default Audio;