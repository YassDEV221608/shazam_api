import '../styles/home.css';
import pub from '../utils/pub.png';
import not_found from '../utils/not-found.png'
import { getTopCharts,getTopArtists } from '../utils/fetchFromAPI';
import Audio from './Audio';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const [isplaying,setIsplaying] = useState(false);
    const [nthAudio,setNthAudio] = useState(-1);
    const [top_artists,setTop_artists] = useState({});
    const [top_charts,setTop_charts] = useState({});
    const [artistsLoaded,setArtistsLoaded] = useState(false);
    const [tracksLoaded,setTracksLoaded] = useState(false);
    const navigation = useNavigate();
    useEffect(() => {
        Promise.all([getTopCharts(20), getTopArtists(20)])
        .then(([chartsData, artistsData]) => {
          if (chartsData !== undefined) {
            setTop_charts(chartsData);
            setTracksLoaded(true);
          } 
    
          if (artistsData !== undefined) {
            setTop_artists(artistsData);
            setArtistsLoaded(true);
          }
          
         
        })
        
    },[])
    
    const handelClick = (index) => {
        if(isplaying) {setIsplaying(false)} else {setIsplaying(true)}
        setNthAudio(index);
       
    }
    useEffect(() => setIsplaying(true),[nthAudio])
    
    return (
        <div className="home">
            <div className="pub">
                <img src={pub} alt="pub" />
            </div>
         {
            (artistsLoaded && tracksLoaded) ? (
            <div>
            <div className="top-charts">
                <h1 className="left">Global Top 200 Charts</h1>
                <h1 className="right"><a href="/charts/top/global">SEE ALL {'>'}</a></h1>
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
            {
                top_charts.tracks && top_charts.tracks[nthAudio] !== undefined ? (<Audio numberOfAudios={top_charts.tracks.length} track={top_charts.tracks[nthAudio]} nthAudio={nthAudio} setNthAudio={setNthAudio} setIsplaying={setIsplaying} isPlaying={isplaying} />) : null 
            }


            {
                top_artists.artists ? (
            <div className="top-artists">
                <h1>Top Artists</h1>
                <div className="line" ></div>
                <div className="artists">
                    {
                        top_artists.artists.map((artist,index) =>  (
                            <div className="artist" key={index}> 
                                {
                                    artist.avatar !== null ? (
                                    <img src={artist.avatar} alt="artist"/>):
                                    (<img src={not_found} alt="artist"/>
                                    )
                                } 
                                <p onClick={() => navigation(`../search/${artist.name}`)}>{artist.name}</p> 
                            </div>  )
                        ) 
                    }
                </div>
                
            
            </div> ) : null
            }
            </div> ): <Loader />
         
        }
        </div> 
    )
      
}



export default Home;