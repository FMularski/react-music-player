import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({songs, currentSong, setCurrentSong}) => {

    const changeSongHandler = (forward) => {
        const currentSongIndex = songs.indexOf(currentSong);
        let nextSongIndex = forward ? currentSongIndex + 1 : currentSongIndex - 1;
        if (nextSongIndex < 0) nextSongIndex = songs.length - 1;
        if (nextSongIndex === songs.length) nextSongIndex = 0;

        setCurrentSong(songs[nextSongIndex]);
    }


    return (
        <div className="player">
            <div className="time-control">
                <p>Start time</p>
                <input type="range" />
                <p>End time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => changeSongHandler(false)} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon className="play" size="2x" icon={faPlay}/>
                <FontAwesomeIcon onClick={() => changeSongHandler(true)} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
        </div>
    )
}

export default Player;