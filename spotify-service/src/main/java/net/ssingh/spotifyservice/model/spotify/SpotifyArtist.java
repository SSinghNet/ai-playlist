package net.ssingh.spotifyservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SpotifyArtist extends Artist {
    @JsonProperty("id")
    private String spotifyId;
    @JsonProperty("uri")
    private String uri;

    private String imageUrl;

    @JsonProperty("images")
    public void unpackImages(List<Map<String, Object>> images) {
        if (images != null && !images.isEmpty()) {
            Object url = images.get(0).get("url");
            if (url != null) {
                this.imageUrl = url.toString();
            }
        }
    }
}
