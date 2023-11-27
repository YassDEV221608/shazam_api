import '../styles/track.css';
import not_found from '../utils/not-found.png'
import { aboutTrack, getSimilarTracks } from '../utils/fetchFromAPI';
import Audio from './Audio';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import { useLocation,useNavigate } from 'react-router-dom';


function extractTrackId(url) {
    const splits = url.split("/");
    return splits[splits.length - 1];
}

const Track = () => {
    const [isplaying,setIsplaying] = useState(false);
    const [nthAudio,setNthAudio] = useState(-1);
    const [top_charts,setTop_charts] = useState({});
    const [infos,setInfos] = useState({});
    const [tracksLoaded,setTracksLoaded] = useState(false);
    const [infosLoaded,setInfosLoaded] = useState(false);
    const location = useLocation()
    const navigation = useNavigate();
    useEffect(() => {
        const id = extractTrackId(location.pathname);
        aboutTrack(id).then((data) => {
            setInfos(data);
            setInfosLoaded(true);
            console.log(data);
        })    
        getSimilarTracks(id).then((data) => {
            setTop_charts(data);
            setTracksLoaded(true);
        })  
    },[navigation,location.pathname])
    
    const handelClick = (index) => {
        if(isplaying) {setIsplaying(false)} else {setIsplaying(true)}
        setNthAudio(index);
       
    }
    useEffect(() => setIsplaying(true),[nthAudio])
    
    return (
        (tracksLoaded && infosLoaded) ? (
        <div className="home">
            {
                infos.track ? (
            <div className="pub">
                <img src={infos.track.cover} alt="pub" />
            </div> ) : null
           }
           {
                top_charts.tracks && top_charts.tracks[nthAudio] !== undefined ? (<Audio numberOfAudios={top_charts.tracks.length} track={top_charts.tracks[nthAudio]} nthAudio={nthAudio} setNthAudio={setNthAudio} setIsplaying={setIsplaying} isPlaying={isplaying} />) : null 
            }
          
         {
            
            <div>
            <div className="top-charts">
                <h1 className="left">Similar</h1>
                <div className="line" ></div>
                

                {
                    top_charts.tracks ? (
                <div className="charts">
                    {
                        top_charts.tracks.map((track,index) => 
                            (
                           
                            <div key={index} className="track">
                                { 
                                isplaying && nthAudio === index  ? (<span className="material-symbols-outlined" onClick={() => handelClick(index)}>pause</span>) :
                                (<span className="material-symbols-outlined" onClick={() => handelClick(index)}>play_arrow</span>)
                                }
                                {track.cover !== null ? <img src={track.cover} alt="track" onClick={() => handelClick(index)}/> : <img src={not_found} alt="track" onClick={() => handelClick(index)}/>}
                                <div className="details">
                                    <p className="title" onClick={() => navigation(`../track/${track.key}`)}>{track.title}</p>
                                    <p className="subtitle" onClick={() => navigation(`../search/${track.artist}`)}>{track.artist}</p>
                                </div>
                            </div>
                            ))
                    }
                    
                </div> ) : null
                }
            </div>
             </div> 
         
        }
        </div> ): <Loader />
    )

}


export default Track;