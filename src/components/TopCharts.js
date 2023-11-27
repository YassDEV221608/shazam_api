import '../styles/topcharts.css';
import { countries,countriesISO,genres } from '../utils/constants';
import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import NotFound from './Notfound';
import Loader from './Loader';
import Audio from './Audio';
import { getCountryCities, getTopCharts, getTopChartsByCity, getTopChartsByCountry, getTopCountryTracksByGenre, getTopWorldTracksByGenre } from '../utils/fetchFromAPI';

function extractCountryFromURL(url) {
    const splits = url.split("/");
    return splits[splits.length - 1];
  }





const TopCharts = () => {
    const [isplaying,setIsplaying] = useState(false);
    const [nthAudio,setNthAudio] = useState(-1);
    const handelClick = (index) => {
        if(isplaying) {setIsplaying(false)} else {setIsplaying(true)}
        setNthAudio(index);
       
    }
    useEffect(() => setIsplaying(true),[nthAudio]);
    const location = useLocation(); 
    const [scountry,setScountry] = useState("");
    const [sgenre,setSgenre] = useState("");
    const [scity,setScity] = useState(""); 
    const [top_charts,setTop_charts] = useState({});
    const [cities,setCities] = useState({});
    const navigation = useNavigate();
    const [isLoaded,setIsLoaded] = useState(false);
    const handleCity = (city) => {
        const isoCode= countriesISO[decodeURIComponent(scountry.toLocaleLowerCase())];
        setIsLoaded(false);
        getTopChartsByCity(isoCode,city).then((data) => {
            if(data !== undefined) {
                setTop_charts(data);
                setIsLoaded(true);
            }
        })
    }
    const handleGenre = (genre) => {
        const isoCode= countriesISO[decodeURIComponent(scountry.toLocaleLowerCase())];
        setIsLoaded(false);
        if(scountry !== "global") {
            getTopCountryTracksByGenre(isoCode,genre).then((data) => {
                if(data !== undefined) {
                    setTop_charts(data);
                    setIsLoaded(true);
                }
            })
        } else {
            getTopWorldTracksByGenre(genre).then((data) => {
                if(data !== undefined) {
                    setTop_charts(data);
                    setIsLoaded(true);
                }
            })
        }
    }
    useEffect(()=>{
            setScountry(extractCountryFromURL(location.pathname));
            const isoCode= countriesISO[decodeURIComponent(scountry.toLocaleLowerCase())];
            setIsLoaded(false);
            if(isoCode !== '') {
                getCountryCities(isoCode).then((data) => {
                    if(data !== undefined) {
                        setCities(data);
                    }
                })
                getTopChartsByCountry(isoCode).then((data) => {
                if(data !== undefined) {
                    setTop_charts(data);
                    setIsLoaded(true);
                }
                
            })} else {
                getTopCharts(200).then((data) => {
                    if(data !== undefined) {
                        setTop_charts(data);
                        setIsLoaded(true);
                    }
                    
                })
            }
    },[scountry,navigation,location.pathname]);

    
   

    
   //            { top_charts.tracks[nthAudio] !== undefined ? (<Audio numberOfAudios={20} track={top_charts.tracks[nthAudio]} nthAudio={nthAudio} setNthAudio={setNthAudio} setIsplaying={setIsplaying} isPlaying={isplaying} />) : null }
    if (countries.includes(decodeURIComponent(scountry.toLocaleLowerCase()))) {
    return ( 
        <div>
            { (isLoaded) ? ( 
        <div className="top-charts-200">
            <div className="pub">
                <select value={scountry} onChange={(e) => {setScountry(e.target.value);navigation(`../charts/top/${e.target.value}`) } }>
                {
                    countries.map((country,index) => 
                        country === scountry.toLocaleLowerCase() ? (<option key={index} value={country} disabled hidden>{country}</option>) : 
                        (<option key={index}   value={country}>{country}</option>)
                    )
               }
               </select>
                {(cities.cities && extractCountryFromURL(location.pathname) !== "global") ? (
                    <select value={scity} onChange={(e) => {setScity(e.target.value);handleCity(e.target.value)}}>{
                    cities.cities.map((city,index) =>  (<option key={index}   value={city}>{city}</option>))
                 }</select>) : null
                }
                <select value={sgenre} onChange={(e) => {setSgenre(e.target.value);handleGenre(e.target.value)}}>{
                    genres.map((genre,index) =>  (<option key={index}   value={genre}>{genre}</option>))
                 }
                 </select>
                
            </div>

            {
                top_charts.tracks && top_charts.tracks[nthAudio] !== undefined ? (<Audio numberOfAudios={top_charts.tracks.length} track={top_charts.tracks[nthAudio]} nthAudio={nthAudio} setNthAudio={setNthAudio} setIsplaying={setIsplaying} isPlaying={isplaying} />) : null 
            }
          
            

            
            { top_charts.tracks ? (
            <div className="top-charts">
                <h1 className="left">Global Top 200 Charts</h1>
                <div className="line" ></div>
                <div className="charts">
                    {
                       top_charts.tracks.map((track,index) => (     
                       <div key={index} className="track">
                           { 
                           isplaying && nthAudio === index  ? (<span className="material-symbols-outlined" onClick={() => handelClick(index)}>pause</span>) :
                           (<span className="material-symbols-outlined" onClick={() => handelClick(index)}>play_arrow</span>)
                           }
                           <img src={track.cover} alt="track" onClick={() => handelClick(index)}/>
                           <div className="details">
                               <p className="title" onClick={() => navigation(`../track/${track.key}`)}>{track.title}</p>
                               <p className="subtitle" onClick={() => navigation(`../search/${track.artist}`)}>{track.artist}</p>
                           </div>
                       </div>
                       )) 
                        }
                    
                </div> 
                
            </div> ) : null
             }
            

        
        </div> ) : <Loader />
       }
        </div>
   ) } else {return (<NotFound text="Country not found" />) }
}

export default TopCharts;