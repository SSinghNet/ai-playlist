package net.ssingh.applemusicservice.model.dto.request.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import net.ssingh.applemusicservice.model.entity.AppleMusicPlaylist;

import java.io.Serializable;

@Data
public class CreatePlaylistRequest implements Serializable {
    @JsonProperty(required = true)
    AppleMusicPlaylist playlist;
    @JsonProperty(required = true)
    String musicUserToken;
}