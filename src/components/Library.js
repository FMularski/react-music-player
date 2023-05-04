import LibrarySong from "./LibrarySong";

const Library = ({isPlaying, audioRef, songs, setCurrentSong}) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong isPlaying={isPlaying} audioRef={audioRef} song={song} setCurrentSong={setCurrentSong} key={song.id} />)}
            </div>
        </div>
    )
}

export default Library;