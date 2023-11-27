import '../styles/loader.css';


const Loader = () => {
    return(
        <div style={{minHeight: '100vh',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader;