import { useState, useEffect } from 'react';
import './styles/app.scss'
import Player from './components/Player';
import Song from './components/Song';
import data from './util';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs.filter(song => song.active)[0]);
  
  return (
    <div>
      <Song currentSong={currentSong} />
      <Player songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
