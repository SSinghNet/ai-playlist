package net.ssingh.spotifyservice.model.dto.external.spotify.response.profile;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import net.ssingh.spotifyservice.model.entity.SpotifyTrack;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SavedTracks {

    private List<SpotifyTrack> tracks;

    @JsonProperty("items")
    public void unpackTracks(List<TracksWrapper> tracksWrappers) {
        tracks = new ArrayList<>();
        tracksWrappers.forEach(tw ->
                tracks.add(tw.getTrack())
        );
    }

    @Getter
    public static class TracksWrapper {
        @JsonProperty("track")
        public SpotifyTrack track;
    }

}
