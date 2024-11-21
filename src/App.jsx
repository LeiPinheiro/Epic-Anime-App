
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import MostPopularSection from './components/MostPopularSection';
import AnimeDetails from './components/AnimeDetails';
import PopularManga from './components/PopularManga'
import MangaDetails from './components/MangaDetails'
import NewAnimeRelease from './components/NewAnimeRelease';
import UpcomingAnimes from './components/UpcomingSection';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={
          <>
            <MainSection />
            <MostPopularSection />
            <PopularManga />
            <NewAnimeRelease />
            <UpcomingAnimes />
          </>
        }/>
        <Route path='/anime/:id' element={<AnimeDetails />}/>
        <Route path='/manga/:id' element={<MangaDetails />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
