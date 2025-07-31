package net.ssingh.spotifyservice.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotifyPlaylistList {
    int total;
    boolean hasPrevious;
    boolean hasNext;

    List<SpotifyPlaylist> playlists;

    @JsonProperty("previous")
    public void unpackPrevious(String previous) {
        this.hasPrevious = (previous != null);
    }
    @JsonProperty("next")
    public void unpackNext(String next) {
        this.hasNext = (next != null);
    }

    @JsonProperty("items")
    public void unpackItems(List<Map<String, Object>> items) {
        for (Map<String, Object> item : items) {
            SpotifyPlaylist playlist = SpotifyPlaylist.builder()
                    .spotifyId((String) item.get("id"))
                    .title((String) item.get("name"))
                    .description((String) item.get("description"))
                    .build();
            getPlaylists().add(playlist);
        }
    }

    public List<SpotifyPlaylist> getPlaylists() {
        if (playlists == null) {
            playlists = new ArrayList<>();
        }
        return playlists;
    }
}
