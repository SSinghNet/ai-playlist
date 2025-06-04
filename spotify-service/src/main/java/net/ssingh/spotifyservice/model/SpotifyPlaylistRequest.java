package net.ssingh.spotifyservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class SpotifyPlaylistRequest {

    SpotifyPlaylist playlist;
    String accessToken;

    @Data
    @AllArgsConstructor
    public static class CreatePlaylistRequestBody {
        private String name;
        private String description;
    }

    @Data
    @AllArgsConstructor
    public static class AddTracksRequestBody {
        private List<String> uris;
    }

}
