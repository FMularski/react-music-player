import { useState, useEffect, useRef } from 'react';
import './styles/app.scss'
import Player from './components/Player';
import Song from './components/Song';
import data from './util';
import Library from './components/Library';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs.filter(song => song.active)[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });

  const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({
            currentTime: current,
            duration: duration
        })
    }
  
  return (
    <div>
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} songInfo={songInfo} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Library isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
    
  );
}

export default App;
