package net.ssingh.spotifyservice.model.entity.spotify;

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
            SpotifyPlaylist playlist = new SpotifyPlaylist();
            playlist.setSpotifyId((String) item.get("id"));
            playlist.setTitle((String) item.get("name"));
            playlist.setDescription((String) item.get("description"));
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
