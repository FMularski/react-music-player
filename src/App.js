import { useState, useRef } from 'react';
import './styles/app.scss'
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs.filter(song => song.active)[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({
            currentTime: current,
            duration: duration
        })
    }

  const changeSongHandler = forward => {
        const currentSongIndex = songs.findIndex(s => s.id === currentSong.id);

        let nextSongIndex = forward ? currentSongIndex + 1 : currentSongIndex - 1;
        if (nextSongIndex < 0) nextSongIndex = songs.length - 1;
        if (nextSongIndex === songs.length) nextSongIndex = 0;

        setCurrentSong(songs[nextSongIndex]);
        if (isPlaying) setTimeout(() => audioRef.current.play(), 100);
    }
  
  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player changeSongHandler={changeSongHandler} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} songInfo={songInfo} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={() => changeSongHandler(true)}></audio>
    </div>
    
  );
}

export default App;
