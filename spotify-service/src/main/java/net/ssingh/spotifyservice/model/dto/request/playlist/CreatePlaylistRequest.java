package net.ssingh.spotifyservice.model.dto.request.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import net.ssingh.spotifyservice.model.entity.SpotifyPlaylist;

import java.io.Serializable;

@Data
public class CreatePlaylistRequest implements Serializable {
    @JsonProperty(required = true)
    SpotifyPlaylist playlist;
    @JsonProperty(required = true)
    String accessToken;
}
