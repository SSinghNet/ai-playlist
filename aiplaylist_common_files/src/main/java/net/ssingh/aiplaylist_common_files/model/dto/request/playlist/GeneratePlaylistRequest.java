package net.ssingh.spotifyservice.model.dto.request.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ssingh.spotifyservice.model.entity.generic.Artist;
import net.ssingh.spotifyservice.model.entity.generic.Track;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratePlaylistRequest implements Serializable {
    @JsonProperty(required = true)
    String userPrompt;
    @JsonProperty(required = true)
    int playlistLength;

    @JsonProperty(required = false)
    List<Track<Artist>> tracks;
    @JsonProperty(required = false)
    List<Artist> artists;

    @JsonProperty(required = false)
    Double temperature;

    @JsonProperty(required = false)
    Double nicheSlider;
}
