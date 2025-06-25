package net.ssingh.soundcloudservice.model.dto.request.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import net.ssingh.soundcloudservice.model.entity.SoundCloudPlaylist;

import java.io.Serializable;

@Data
public class CreatePlaylistRequest implements Serializable {
    @JsonProperty(required = true)
    SoundCloudPlaylist playlist;
    @JsonProperty(required = true)
    String accessToken;
}
