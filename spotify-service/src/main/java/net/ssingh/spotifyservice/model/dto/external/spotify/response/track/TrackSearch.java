package net.ssingh.spotifyservice.model.dto.external.spotify.response.track;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import net.ssingh.spotifyservice.model.entity.SpotifyTrack;

import java.util.List;
@Getter
public class TrackSearch {
    private SpotifyTrack track;

    @JsonProperty("tracks")
    public void unpackTracks(TracksWrapper wrapper) {
        if (wrapper != null && wrapper.getItems() != null && !wrapper.getItems().isEmpty()) {
            this.track = wrapper.getItems().get(0);
        }
    }

    @Getter
    public static class TracksWrapper {
        private List<SpotifyTrack> items;
    }
}
