import "./MusicSection.css"

const JoinVoiceChannel = () => {
    return (
        <div className="music-channels-voice">
            <div className="music-channels-voice-name">Voice Channel Name</div>
            <div className="music-channels-voice-join">
                <button className="music-channels-voice-join-button">
                    <div className="music-channels-voice-join-button-text">Join</div>
                    </button>
            </div>
        </div>
    )
}

const LeaveVoiceChannel = () => {
    return (
        <div className="music-channels-voice-l">
            <div className="music-channels-voice-name">Voice Channel Name</div>
            <div className="music-channels-voice-leave">
                <button className="music-channels-voice-leave-button">
                    <div className="music-channels-voice-leave-button-text">Leave</div>
                    </button>
            </div>
        </div>
    )
}

const PlayingSong = () => {
    return (
        <div className="music-queue-song">
            <div className="music-queue-playing"></div>
            <div className="music-queue-song-name">1. Song's Name</div>
        </div>
    )
}
const QueueSong = () => {
    return (
        <div className="music-queue-song-next">
            <div className="music-queue-queue-name">1. Song's Name</div>
        </div>
    )
}

const MusicSection = () => {
  return (
    <>
    <div className='headline1'><h1>Music Section</h1></div>
    <div className='music-layout'>
        <div className="music-channels">
            <div className="music-channels-title">Channels</div>
            <div className="music-channels-list">
                <JoinVoiceChannel />
                <LeaveVoiceChannel />
                <JoinVoiceChannel />
            </div>
        </div>
        <div className="music-player">
            <div className="music-player-hz">
                <div className="music-player-vt">
                    <div className="music-player-vt-layout">
                        <div className="music-player-title">Currently Playing</div>
                        <div>
                            <div className="music-player-track-info-split">
                                <div className="music-player-track-cover"></div>
                                <div>
                                    <div className="music-player-track-info-trackname">Track Name</div>
                                    <div className="music-player-track-info-author">Author</div>
                                    <div className="music-player-track-info-time">2:35</div>
                                    <div className="music-player-track-info-likes">2.6k Likes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="music-player-volume">
                        <div className="music-player-volume-cont">
                            <input type="range" min="0" max="100" name="volume" id="volume" className="music-player-volume-slider" />
                        </div>
                        <div className="music-player-volume-icon"></div>
                    </div>
                </div>
                <div className="music-player-controllers">
                    <div className="music-player-controllers-split">
                        <input type="range" name="timeshift" id="timeshift" className="music-player-controllers-slider" />
                        <div className="music-player-controllers-time">00:00</div>
                    </div>
                    <div className="music-player-controllers-buttons">
                        <div className="music-player-controllers-back"></div>
                        <div className="music-player-controllers-play"></div>
                        <div className="music-player-controllers-forward"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="music-queue">
            <div className="music-queue-title-layout">
                <div className="music-queue-title">Queue</div>
                <div className="music-queue-add">
                    <a href="#" className="music-queue-add-container">
                        <div className="music-queue-add-container-plus">+</div>
                    </a>
                </div>
            </div>
            <div className="music-queue-list">
                <QueueSong />
                <PlayingSong />
                <QueueSong />
                <QueueSong />
                <QueueSong />
                <QueueSong />
            </div>
        </div>
    </div>
    </>
  )
}

export default MusicSection