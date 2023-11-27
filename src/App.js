import Navbar from './components/Navbar';
import Home from './components/Home';
import Animation from './components/Animation';
import Contact from './components/Contact';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import TopCharts from './components/TopCharts';
import NotFound from './components/Notfound';
import Track from './components/Track';
import Search  from './components/Search';


function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
          <Routes>
            <Route path="/" element = {<Home />}/>
            <Route path="charts/top/:country" element={<TopCharts />}/>
            <Route path="track/:id" element={<Track />}/>
            <Route path="search/:query" element={<Search />}/>
            <Route path="*" element={<NotFound text="Error 404 page not found"/>} />
          </Routes>
      </BrowserRouter>
      <Animation />
      <Contact />
    </div>
  );
}

export default App;
