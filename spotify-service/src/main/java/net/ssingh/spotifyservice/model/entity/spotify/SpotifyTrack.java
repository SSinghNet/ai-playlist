package net.ssingh.spotifyservice.model.spotify;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ssingh.spotifyservice.model.generic.Track;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotifyTrack extends Track<SpotifyArtist> {
    private String uri;
    @JsonProperty("id")
    private String spotifyId;

    @JsonProperty("duration_ms")
    private int durationMs;

    private String imageUrl;

    private List<String> artistIds;


    @JsonProperty("tracks")
    public void createTrack(Map<String, Object> trackMap) {
        List<Map<String, Object>> items = (List<Map<String, Object>>) trackMap.get("items");
        if (items == null || items.isEmpty()) {
            return;
        }

        Map<String, Object> item = items.get(0);

        this.uri = (String) item.get("uri");
        this.spotifyId = (String) item.get("id");
        this.durationMs = (int) item.get("duration_ms");


        Map<String, Object> album = (Map<String, Object>) item.get("album");
        if (album != null) {
            List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
            if (images != null && !images.isEmpty()) {
                createImage(images);
            }
        }

        this.setName((String) item.get("name"));

        List<String> artistIds = new ArrayList<>();

        ((List<Map<String, Object>>) item.get("artists")).forEach(artist -> {
            artistIds.add((String) artist.get("id"));
        });

        this.artistIds = artistIds;

    }

    @JsonProperty("album")
    public void createImageFromAlbum(Map<String, Object> album){
        List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
        if (images != null && !images.isEmpty()) {
            createImage(images);
        }
    }

    @JsonProperty("images")
    public void createImage(List<Map<String, Object>> images) {
        this.imageUrl = (String) images.get(0).get("url");
    }
}
