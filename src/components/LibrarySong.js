const LibrarySong = ({setSongs, isPlaying, audioRef, song, songs, setCurrentSong}) => {
    function songSelectHandler() {
        setCurrentSong(song);

        const updatedSongs = songs.map(s => {
            if (s.id === song.id) return {...s, active: true};
            else return {...s, active: false};
        })

        setSongs(updatedSongs);

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
        <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={songSelectHandler}>
            <img alt={song.name} src={song.cover} />
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    )
}

export default LibrarySong;