import LibrarySong from "./LibrarySong";

const Library = ({libraryStatus, setSongs, isPlaying, audioRef, songs, setCurrentSong}) => {
    return (
        <div className={`library ${libraryStatus ? '' : 'hidden'}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} song={song} songs={songs} setCurrentSong={setCurrentSong} key={song.id} />)}
            </div>
        </div>
    )
}

export default Library;