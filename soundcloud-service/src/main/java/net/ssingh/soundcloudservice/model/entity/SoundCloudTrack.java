package net.ssingh.soundcloudservice.model.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SoundCloudTrack extends Track<SoundCloudArtist> {
    String urn;
    @JsonAlias("artwork_url")
    String imageUrl;

    @JsonAlias("permalink_url")
    String url;

    @JsonAlias({"durationMs", "duration"})
    int durationMs;

    @JsonProperty("user")
    public void createArtist(SoundCloudArtist artist) {
        this.addArtist(artist);
    }
}
