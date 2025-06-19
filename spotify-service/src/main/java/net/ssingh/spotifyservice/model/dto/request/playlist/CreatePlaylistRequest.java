package net.ssingh.spotifyservice.model.dto.request.playlist;

import lombok.Data;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyPlaylist;

import java.io.Serializable;

@Data
public class CreatePlaylistRequest implements Serializable {
    SpotifyPlaylist playlist;
    String accessToken;
}
