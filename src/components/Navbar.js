import logo from '../utils/shazam.png';
import '../styles/navbar.css';
import { useState } from 'react';





const Navbar = () => {
    const [active,setActive] = useState(false);
    const [searchValue,setSearchValue] = useState("");
    return (
        <div className="navbar">
            <div className="logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <div className="nav">
                <div><a href="/">GET THE APP</a></div>
                <div><a href="/charts/top/global">CHARTS</a></div>
            </div>
            <form className="search" onSubmit={(e) => {e.preventDefault();window.location=`/search/${searchValue}`}}>
                {
                    active === false ? (
                <input className="input" type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                     ) : (
                        <input className="input-active" type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>

                     )
               }
                
                <span className="material-symbols-outlined" onClick={() =>  {
                    if(active === false) {
                        setActive(true)
                    } else {
                        setActive(false);
                    }
                }}>search</span>
               
            </form>
            <div className="menu" onClick={() => document.getElementsByClassName("mobile-nav")[0].style.display = "flex"}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="mobile-nav">
                <div><span onClick={() => document.getElementsByClassName("mobile-nav")[0].style.display = "none"}>X</span></div>
                <div><a href="/">GET THE APP</a></div>
                <div><a href="/charts/top/global">CHARTS</a></div>
            </div>

        </div>
    )

}


window.onscroll = function() {scrollFunc()}
function scrollFunc() {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        document.getElementsByClassName("navbar")[0].style.backgroundColor = "aqua";
    } else {
        document.getElementsByClassName("navbar")[0].style.backgroundColor = "transparent";
    }
} 
    

export default Navbar;