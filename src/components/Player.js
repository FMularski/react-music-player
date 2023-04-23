import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({songs, currentSong, setCurrentSong}) => {

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: null,
        duration: null
    });

    const changeSongHandler = (forward) => {
        const currentSongIndex = songs.indexOf(currentSong);
        let nextSongIndex = forward ? currentSongIndex + 1 : currentSongIndex - 1;
        if (nextSongIndex < 0) nextSongIndex = songs.length - 1;
        if (nextSongIndex === songs.length) nextSongIndex = 0;

        setCurrentSong(songs[nextSongIndex]);
    }

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false);
        } else {
            audioRef.current.play()
            setIsPlaying(true);
        }
    }

    const getTime = time => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
	    return `${minutes}:${secondsWithZero}`
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({
            currentTime: current,
            duration: duration
        })
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
    }


    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} value={songInfo.currentTime} type="range" min={0} max={songInfo.duration} />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => changeSongHandler(false)} className="skip-back" color="white" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={() => playSongHandler()} className="play" size="2x" color="white" icon={faPlay}/>
                <FontAwesomeIcon onClick={() => changeSongHandler(true)} className="skip-forward" color="white" size="2x" icon={faAngleRight}/>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player;