package net.ssingh.spotifyservice.model.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SpotifyTrack extends Track<SpotifyArtist> {
    private String uri;
    @JsonProperty("id")
    private String spotifyId;

    @JsonAlias("duration_ms")
    private int durationMs;

    private String imageUrl;

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
