package net.ssingh.spotifyservice.model.dto.request;

import lombok.Data;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyPlaylist;

import java.io.Serializable;

@Data
public class CreatePlaylistRequestBody implements Serializable {
    SpotifyPlaylist playlist;
    String accessToken;
}
