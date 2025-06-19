package net.ssingh.spotifyservice.model.dto.external.spotify.response.profile;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyArtist;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyTrack;

import java.util.List;

@Getter
public class TopArtists {
    @JsonProperty("items")
    List<SpotifyArtist> artists;
}
