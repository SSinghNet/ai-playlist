package net.ssingh.spotifyservice.model.dto.external.spotify.response.playlist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ssingh.spotifyservice.model.entity.SpotifyTrack;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPlaylistResponse implements Serializable {
    String id;
    String name;
    String description;

    Tracks tracks;

    @Data
    public static class Tracks implements Serializable {
        List<Track> items;

        @Data
        public static class Track implements Serializable {
            SpotifyTrack track;
        }
    }
}
