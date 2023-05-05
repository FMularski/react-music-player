import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { playAudio } from "../util";

const Player = ({isPlaying, setIsPlaying, audioRef, songInfo, songs, setSongs, currentSong, setCurrentSong}) => {
    const changeSongHandler = (forward) => {
        const currentSongIndex = songs.findIndex(s => s.id === currentSong.id);
        console.log(currentSongIndex);

        let nextSongIndex = forward ? currentSongIndex + 1 : currentSongIndex - 1;
        if (nextSongIndex < 0) nextSongIndex = songs.length - 1;
        if (nextSongIndex === songs.length) nextSongIndex = 0;

        setCurrentSong(songs[nextSongIndex]);
        playAudio(isPlaying, audioRef);
    }

    useEffect(() => {
        const newSongs = songs.map(s => {
            if (s.id === currentSong.id) return {...s, active: true};
            else return {...s, active: false};
        })
        setSongs(newSongs);
    }, [currentSong]);

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

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} value={songInfo.currentTime} type="range" min={0} max={songInfo.duration || 0} />
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => changeSongHandler(false)} className="skip-back" color="white" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={() => playSongHandler()} className="play" size="2x" color="white" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => changeSongHandler(true)} className="skip-forward" color="white" size="2x" icon={faAngleRight}/>
            </div>
        </div>
    )
}

export default Player;