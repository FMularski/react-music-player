const Song = ({currentSong}) => {
    return (
        <div className="song-container">
            <img src={currentSong.cover} alt="song-cover"/>
            <h3>{currentSong.name}</h3>
            <p>{currentSong.artist}</p>
        </div>
    )
}

export default Song;