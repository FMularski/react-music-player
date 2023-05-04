const LibrarySong = ({isPlaying, audioRef, song, setCurrentSong}) => {
    function pickSong() {
        setCurrentSong(song);
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if(playPromise !== undefined) {
                playPromise.then(audio => {
                    audioRef.current.play();
                });
            }
        }
        
    }

    return (
        <div className="library-song" onClick={pickSong}>
            <img alt={song.name} src={song.cover} />
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    )
}

export default LibrarySong;