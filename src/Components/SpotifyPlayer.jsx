import React, { useEffect, useState } from "react";

const SpotifyPlayer = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const searchSong = async (searchTerm) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
      {
        headers: { Authorization: `Bearer 86261e0c2b794002a3a33262eae8551f` },
      }
    );

    const data = await response.json();
    if (data.tracks.items.length > 0) {
      setTrack(data.tracks.items[0]);
    }
  };

  useEffect(() => {
    searchSong("TheLittleBiggy lhdiya");
  }, []);

  const handlePlayPause = async () => {
    const response = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer 86261e0c2b794002a3a33262eae8551f`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [track.uri] }),
    });

    const data = await response.json();
    setIsPlaying(data.is_playing);
  };

  return (
    <div>
      {track && (
        <div>
          <h2>{track.name}</h2>
          <p>{track.artists[0].name}</p>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
      <input
        type="text"
        placeholder="Search for a song"
        onInput={(e) => searchSong(e.target.value)}
      />
    </div>
  );
};

export default SpotifyPlayer;
